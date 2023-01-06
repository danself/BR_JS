import pandas as pd
import numpy as np
import scipy.stats as stats
import matplotlib.pyplot as plt
import json
from pandas.io.json import json_normalize

import plotly.express as px
from plotly.offline import init_notebook_mode, iplot

import dash
from dash import Dash
import dash_html_components as html
import dash_core_components as dcc
import dash_table as dt
from django_plotly_dash import DjangoDash

#from jupyter_dash import JupyterDash
#import dash_html_components as html

from random import sample

bb_app = DjangoDash('VarianceSim',
                    serve_locally = True) #might need to wrap the input insdie the other html.Div
bb_app.layout = html.Div(
                        children = [
                            html.H1(children = 'Poker Bankroll and Variance Simulator',),
                            html.P(
                                children = 'Simulate how your poker results will vary'
                                'and how you should approach your bankroll management',
                            ),
                            html.Div(children = [
                                html.H2('Results in bb'),
                                html.Span(children = [
                                    html.I('Enter your winrate (bb/100), standard deviation (STD (bb/100)), and number of hands'
                                          ' to simulate. The first graph will display winnings/losses in big blinds')
                                ]),

                                html.Div(children = [
                                    html.Span(children = [html.B('Win Rate (bb/100) ')]),
                                    dcc.Input(
                                        id = "win-rate-input",
                                        placeholder = 'Enter win rate (bb/100)',
                                        type = 'number',
                                        value = 5),
                                    html.Span(children =[html.B(' STD (bb/100) ')]),
                                    dcc.Input(
                                        id = "std-input",
                                        placeholder = 'Enter STD (bb/100)',
                                        type = 'number',
                                        value = 100),
                                    html.Span(children = [html.B(' No Hands to Simulate ')]),
                                    dcc.Input(
                                        id = "hands-input",
                                        placeholder = 'Enter Number of Hands',
                                        type = 'number',
                                        value = 10000)])]),
                                    html.Button(id='bb-button', n_clicks=0, children='Submit'),


                            html.Div(dcc.Graph(id = 'bbwin', style = {'width':'80%'})),

                            html.Table(children = [
                                html.Tr([html.Td(['Mean Winnings (bb)']), html.Td(id = 'bb-mean-win')]),
                                html.Tr([html.Td(['Expected Value (bb)']), html.Td(id = 'expected-val')]),
                                html.Tr([html.Td(['STD Winnings (bb)']), html.Td(id = 'bb-std-win')]),
                                html.Tr([html.Td(['95% Confidence Interval (bb)']), html.Td(id = 'bb-95ci')]),
                                html.Tr([html.Td(['70% Confidence Interval (bb)']), html.Td(id = 'bb-70ci')]),
                                html.Tr([html.Td(['Mean bb/100']), html.Td(id = 'mean-bb100')]),
                                html.Tr([html.Td(['STD bb/100']), html.Td(id = 'std-bb100')]),
                                html.Tr([html.Td(['95% Confidence Interval (bb/100)']), html.Td(id = '95ci-bb100')]),
                                html.Tr([html.Td(['70% Confidence Interval (bb/100)']), html.Td(id = '70ci-bb100')]),
                            ], className = 'bb-table'),

                        ])



from dash.dependencies import Input, Output, State

@bb_app.callback(
    Output(component_id = 'bbwin', component_property = 'figure'),
    Output(component_id = 'bb-mean-win', component_property = 'children'),
    Output(component_id = 'expected-val', component_property = 'children'),
    Output(component_id = 'bb-std-win', component_property = 'children'),
    Output(component_id = 'bb-95ci', component_property = 'children'),
    Output(component_id = 'bb-70ci', component_property = 'children'),
    Output(component_id = 'mean-bb100', component_property = 'children'),
    Output(component_id = 'std-bb100', component_property = 'children'),
    Output(component_id = '95ci-bb100', component_property = 'children'),
    Output(component_id = '70ci-bb100', component_property = 'children'),
    inputs = [Input('bb-button', 'n_clicks')],
    state = [State('win-rate-input', 'value'),
             State('std-input', 'value'),
             State('hands-input', 'value'),])

def update_bb_graph(n_clicks, winrate, std, hands):
    #def crate_simulation_bb(winrate, std, hands): ##now use original functions in first cell to create Pandas DF

        wrperhand = winrate/100
        stdperhand = std/10

        sims_list = ['sim' +" " + str(x) for x in range(1,21)]


        #populate each simulation with results for each hand
        for i in range(0,20):
            sims_list[i] = np.random.normal(wrperhand, stdperhand, hands)
            sims_list[i][0] = 0

        #Generate names for legend labels
        names = ['sim ' + str(x) for x in range(1,21)]

        #X axis for number of hands


        #cumulate results for each hand for overall results in BBs
        sims_list_cum = [(np.cumsum(x)) for x in sims_list]
        x_axis = ()
        sims_list_graph = []
        ##Sample hands from list if too many hands simulated
        if hands > 1000000:
            sims_list_graph = [x[0:hands:10] for x in sims_list_cum]
            x_axis = np.arange(0, hands/10)
        else:
            sim_list_graph = [x[:] for x in sims_list_cum]
            x_axis = np.arange(0, hands)


        sim_graph = px.line(
            x = x_axis,
            y = sim_list_graph)
        sim_graph.update_layout(yaxis_title = 'BB Won')
        if hands > 1000000:
            sim_graph.update_traces(hovertemplate = 'Hand %{x*10} <br> BB Won %{y}')
        else:
            sim_graph.update_traces(hovertemplate = 'Hand %{x} <br> BB Won %{y}')

        for idx, name in enumerate(names):
            sim_graph.data[idx].name = name



        end_winnings = [float(x[-1]) for x in sims_list_cum]
        #population
        end_winnings_mean = round(np.mean(end_winnings), 2)
        expected_val = wrperhand*hands

        end_winnings_std = round(np.std(end_winnings), 2)

        end_winnings_95_lower = round(stats.t.ppf(0.025, df = 19, loc = end_winnings_mean, scale = end_winnings_std), 2)
        end_winnings_95_upper = round(stats.t.ppf(0.975, df = 19, loc = end_winnings_mean, scale = end_winnings_std), 2)
        end_winnings_95 = str((end_winnings_95_lower, end_winnings_95_upper))
        end_winnings_70_lower = round(stats.t.ppf(0.15, df = 19, loc = end_winnings_mean, scale = end_winnings_std),2)
        end_winnings_70_upper = round(stats.t.ppf(0.85, df = 19, loc = end_winnings_mean, scale = end_winnings_std),2)
        end_winnings_70 = str((end_winnings_70_lower, end_winnings_70_upper))



        end_bb100 = [(x/hands)*100 for x in end_winnings]

        #population
        mean_bb100 = round(np.mean(end_bb100),2)

        #this should be population
        std_bb100 = round(np.std(end_bb100),2)

        #remake this with normal distribution based on input data
        #wr_95_lower = round(stats.t.ppf(0.025, df = 19, loc = mean_bb100, scale = std_bb100),2)
        #wr_95_upper = round(stats.t.ppf(0.975, df = 19, loc = mean_bb100, scale = std_bb100),2)
        wr_conf_int_95 = str((round(end_winnings_95_lower/(hands/100), 2), round(end_winnings_95_upper/(hands/100), 2)))


        wr_70_lower = round(stats.t.ppf(0.15, df = 19, loc = mean_bb100, scale = std_bb100),2)
        wr_70_upper = round(stats.t.ppf(0.85, df = 19, loc = mean_bb100, scale = std_bb100),2)
        wr_conf_int_70 = str((round(end_winnings_70_lower/(hands/100), 2), round(end_winnings_70_upper/(hands/100),2)))


        return sim_graph, end_winnings_mean, expected_val, end_winnings_std, end_winnings_95, end_winnings_70, mean_bb100, std_bb100, wr_conf_int_95, wr_conf_int_70
