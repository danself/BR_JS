function l(b) { var a = 1 / (1 + 0.2316419 * Math.abs(b)),
        a = 0.3989423 * Math.exp(-b * b / 2) * a * (0.3193815 + a * (-0.3565638 + a * (1.781478 + a * (-1.821256 + 1.330274 * a))));
    0 < b && (a = 1 - a); return a }

function m(b, a) { var f = 0,
        c = 0;
    do f = 2 * Math.random() - 1, c = 2 * Math.random() - 1, c = f * f + c * c; while (0 == c || 1 < c);
    c = Math.sqrt(-2 * Math.log(c) / c); return f * c * b + a }

function n() { this.a = 1E5;
    this.b = 0.05;
    this.h = 0.02;
    this.c = 12;
    this.k = 20;
    this.l = 1E3;
    this.e = 250;
    this.f = 1E6;
    this.g = 1 * this.f / 500;
    this.j = 1E8;
    this.i = 1E3;
    this.d = [] }

function p(b) { for (var a = [0], f = 0, c = 1 * b.c * Math.sqrt(1 * b.a / b.e), d = 1 * b.a / b.e * b.b, e = 1; e < b.e; e++) f += m(c, d), a.push(f); return a }

function q(b, a) { for (var f = b.d[0][b.d[0].length - 1], c = 0, d = 0; d < b.d.length; d++) { var e = b.d[d].length - 1;
        a ? b.d[d][e] > f && (f = b.d[d][e], c = d) : b.d[d][e] < f && (f = b.d[d][e], c = d) } return b.d[c] }

function r(b) { for (var a = [0], f = 1; f < b.e; f++) a.push(b.a * f / b.e * b.b); return a }

function s(b) {
    for (var a = [
            ["Hand", "Sample", "Downswing"]
        ], f = 0, c = 0, d = 0, e = b.c * Math.sqrt(b.g), g = b.g * b.b, h = 1; h <= b.f / b.g; h++) f += m(e, g), f > c && (c = f), d = c - f, a.push([h * b.g, Math.round(f), Math.round(d)]);
    a = google.visualization.arrayToDataTable(a);
    b = { title: Math.round(b.f / 1E5) / 10 + " million hand sample (" + (100 * b.b).toFixed(2) + " BB/100 winrate, " + (10 * b.c).toFixed(2) + " BB/100 std.)", theme: "maximized", backgroundColor: "none", series: { 0: { lineWidth: 1, targetAxisIndex: 1 } } };
    (new google.visualization.AreaChart(document.getElementById("downswing_div"))).draw(a,
        b)
}
setTimeout(function() { google.load("visualization", "1", { callback: "", packages: ["corechart"] }) }, 1E3);
setTimeout("calc()", 1500);
window.calc = function(b) {
    var a = new n;
    a.b = 1 * document.getElementById("winrate").value / 100;
    a.c = 1 * document.getElementById("sd").value / 10;
    a.h = 1 * document.getElementById("observed_winrate").value / 100;
    a.a = document.getElementById("hande").value;
    a.f = 1E6 * document.getElementById("downswing_range").value;
    a.g = 1 * a.f / 400;
    if ("undefined" === typeof b) {
        b = r(a);
        for (var f = [
                [0, 0, 0, 0]
            ], c = r(a), d = [0, 0, 0, 0], e = 0, g = 1; g < a.e; g++) e = Math.sqrt(1 * a.a * g / a.e) * a.c, d[0] = c[g] + e, d[1] = c[g] - e, d[2] = c[g] + 2 * e, d[3] = c[g] - 2 * e, f.push([d[0], d[1], d[2],
            d[3]
        ]);
        a.d = [];
        for (c = 0; c < a.l; c++) a.d.push(p(a));
        c = q(a, !0);
        d = q(a, !1);
        e = ["Hands;EV;70% confidence interval;SD-;95% confidence interval;SD--;Best;Worst".split(";")];
        for (g = 0; g < a.k; g++) e[0].push("Sample " + (g + 1));
        for (g = 0; g < a.e; g++) { var h = [];
            h.push(Math.round(a.a * g / a.e));
            h.push(Math.round(b[g])); for (var k = 0; 4 > k; k++) h.push(Math.round(f[g][k]));
            h.push(Math.round(c[g]));
            h.push(Math.round(d[g])); for (k = 0; k < a.k; k++) h.push(Math.round(a.d[k][g]));
            e.push(h) } b = google.visualization.arrayToDataTable(e);
        f = {
            title: "samples over " +
                a.a + " hands and confidence intervals (" + (100 * a.b).toFixed(2) + " BB/100 winrate, " + (10 * a.c).toFixed(2) + " BB/100 std.)",
            theme: "maximized",
            backgroundColor: "none",
            series: {
                0: { color: "black", lineWidth: 3 },
                1: { color: "#66FF66", lineWidth: 3 },
                2: { color: "#66FF66", visibleInLegend: !1, lineWidth: 3 },
                3: { color: "#009933", lineWidth: 3 },
                4: { color: "#009933", visibleInLegend: !1, lineWidth: 3 },
                5: { color: "#00CCFF", lineWidth: 3 },
                6: { color: "#800000", lineWidth: 3 },
                7: { visibleInLegend: !1, lineWidth: 1 },
                8: { visibleInLegend: !1, lineWidth: 1 },
                9: {
                    visibleInLegend: !1,
                    lineWidth: 1
                },
                10: { visibleInLegend: !1, lineWidth: 1 },
                11: { visibleInLegend: !1, lineWidth: 1 },
                12: { visibleInLegend: !1, lineWidth: 1 },
                13: { visibleInLegend: !1, lineWidth: 1 },
                14: { visibleInLegend: !1, lineWidth: 1 },
                15: { visibleInLegend: !1, lineWidth: 1 },
                16: { visibleInLegend: !1, lineWidth: 1 },
                17: { visibleInLegend: !1, lineWidth: 1 },
                18: { visibleInLegend: !1, lineWidth: 1 },
                19: { visibleInLegend: !1, lineWidth: 1 },
                20: { visibleInLegend: !1, lineWidth: 1 },
                21: { visibleInLegend: !1, lineWidth: 1 },
                22: { visibleInLegend: !1, lineWidth: 1 },
                23: {
                    visibleInLegend: !1,
                    lineWidth: 1
                },
                24: { visibleInLegend: !1, lineWidth: 1 },
                25: { visibleInLegend: !1, lineWidth: 1 },
                26: { visibleInLegend: !1, lineWidth: 1 }
            }
        };
        (new google.visualization.LineChart(document.getElementById("chart_div"))).draw(b, f);
        b = '<table class="regular-table">' + ("<tr><td style='width:50%;'>EV <span class='tooltip'>(&raquo;?&laquo;)<em>win rate entered above</em></span></td><td style='width:50%;'>" + (100 * a.b).toFixed(2) + " BB/100</td></tr>");
        b += "<tr><td>Standard deviation <span class='tooltip'>(&raquo;?&laquo;)<em>standard deviation entered above</em></span></td><td>" +
            (10 * a.c).toFixed(2) + " BB/100</td></tr>";
        b += "<tr><td>Hands<span class='tooltip'>(&raquo;?&laquo;)<em>number of hands entered above</em></span></td><td>" + a.a + "</td></tr>";
        b += "<tr><td>Expected winnings <span class='tooltip'>(&raquo;?&laquo;)<em>estimated winnings over the simulated amount of hands</em></span></td><td>" + (a.b * a.a).toFixed(2) + " BB</td></tr>";
        b += "<tr><td>Standard deviation after " + a.a + " hands <span class='tooltip'>(&raquo;?&laquo;)<em>This number shows by how much your actual results will differ from the expected results on average. The first number shows the absolute value, the second translates this number into BB/100, showing the impact on your winrate.</em></span></td><td>" +
            Math.round(a.c * Math.sqrt(a.a)) + " BB<br>" + (100 * a.c * Math.sqrt(a.a) / a.a).toFixed(2) + " BB/100 </td></tr>";
        b += "<tr><td>70% confidence interval <span class='tooltip'>(&raquo;?&laquo;)<em>Your actual results over the simulated amount of hands will be within this interval 70% of the time. The first interval shows absolute numbers, the second translates those into BB/100, showing the 70% confidence interval for your winrate.</em></span></td><td> [" + Math.round(a.b * a.a - a.c * Math.sqrt(a.a)) + " BB, " + Math.round(a.b *
            a.a + a.c * Math.sqrt(a.a)) + " BB]<br>[" + (100 * a.b - 100 * a.c * Math.sqrt(a.a) / a.a).toFixed(2) + " BB/100, " + (100 * a.b + 100 * a.c * Math.sqrt(a.a) / a.a).toFixed(2) + " BB/100]</td></tr>";
        b += "<tr><td>95% confidence interval <span class='tooltip'>(&raquo;?&laquo;)<em>Same as the above with 95% certainty. Meaning: 19 out 20 times your actual winnings will be within this interval.</em></span></td><td> [" + Math.round(a.b * a.a - 2 * a.c * Math.sqrt(a.a)) + " BB, " + Math.round(a.b * a.a + 2 * a.c * Math.sqrt(a.a)) + " BB]<br>[" + (100 * a.b - 200 * a.c *
            Math.sqrt(a.a) / a.a).toFixed(2) + " BB/100, " + (100 * a.b + 200 * a.c * Math.sqrt(a.a) / a.a).toFixed(2) + " BB/100]</td></tr>";
        b += "<tr><td>Probability of loss after " + a.a + " hands <span class='tooltip'>(&raquo;?&laquo;)<em>probability that you will experience negative winnings (meaning: losses) over the amount of hands</em></span></td><td>" + (100 * l(1 * -a.b * a.a / (a.c * Math.sqrt(a.a)))).toFixed(4) + "%</td></tr>";
        b += "<tr><td>Probability of running at or above observed win rate (" + (100 * a.h).toFixed(2) + " BB/100) over " + a.a +
            " hands with a true win rate of " + (100 * a.b).toFixed(2) + " BB/100 <span class='tooltip'>(&raquo;?&laquo;)<em>If you entered an observed winrate, this number will show you the probability that you will experience a run at or above this winrate over the amount of hands.</em></span></td><td>" + (100 * l(1 * -(a.h - a.b) * a.a / (a.c * Math.sqrt(a.a)))).toFixed(4) + "%</td></tr>";
        b += "<tr><td>Probability of running below observed win rate (" + (100 * a.h).toFixed(2) + " BB/100) over " + a.a + " hands with a true win rate of " + (100 *
            a.b).toFixed(2) + " BB/100 <span class='tooltip'>(&raquo;?&laquo;)<em>Same as above - probability that you will experience a run below the observed winrate over the amount of hands.</em></span></td><td>" + (100 * l(1 * -(a.b - a.h) * a.a / (a.c * Math.sqrt(a.a)))).toFixed(4) + "%</td></tr>";
        b += "<tr><td>Minimum bankroll for less than 5% risk of ruin <span class='tooltip'>(&raquo;?&laquo;)<em>the bankroll needed to have a risk of ruin of less than 5%</em></span></td><td>" + Math.round(Math.log(0.05) * a.c * a.c / (-2 * a.b)) +
            " BB</td></tr>";
        b += "</table>";
        document.getElementById("graph-explained").innerHTML = b;
        s(a);
        d = [
            []
        ];
        e = 0;
        b = [
            [300, 0, 0],
            [500, 0, 0],
            [750, 0, 0],
            [1E3, 0, 0],
            [1500, 0, 0],
            [2E3, 0, 0],
            [3E3, 0, 0],
            [5E3, 0, 0],
            [7500, 0, 0],
            [1E4, 0, 0],
            [15E3, 0, 0],
            [2E4, 0, 0],
            [3E4, 0, 0],
            [5E4, 0, 0],
            [75E3, 0, 0],
            [1E5, 0, 0],
            [15E4, 0, 0],
            [2E5, 0, 0],
            [3E5, 0, 0],
            [5E5, 0, 0]
        ];
        for (var f = [
                [5E3, 0, 0],
                [7500, 0, 0],
                [1E4, 0, 0],
                [15E3, 0, 0],
                [2E4, 0, 0],
                [3E4, 0, 0],
                [5E4, 0, 0],
                [75E3, 0, 0],
                [1E5, 0, 0],
                [15E4, 0, 0],
                [2E5, 0, 0],
                [3E5, 0, 0],
                [5E5, 0, 0],
                [75E4, 0, 0],
                [1E6, 0, 0],
                [15E5, 0, 0],
                [2E6, 0, 0],
                [3E6,
                    0, 0
                ],
                [5E6, 0, 0],
                [75E5, 0, 0]
            ], k = h = g = 0, t = a.c * Math.sqrt(a.i), u = a.i * a.b, c = 1; c <= a.j / a.i; c++) e += m(t, u), e >= g ? (0 < k && d.push([h, k]), g = e, h = k = 0) : g > e && (k += a.i, g - e > h && (h = g - e));
        0 < k && d.push([h, k]);
        for (c = 0; c < d.length; c++)
            for (e = 0; e < b.length; e++) d[c][0] >= b[e][0] && (b[e][1] += d[c][1]);
        for (c = 0; c < d.length; c++)
            for (e = 0; e < f.length; e++) d[c][1] >= f[e][0] && (f[e][1] += d[c][1]);
        d = "<p>For this analysis a downswing is defined as any period where the current total winnings are below the maximum previous total winnings. Any downswing is considered to last until the total winnings at least equal the previous peak.</p><p>The following tables are derived by a simulation over 100 million hands. The first one shows how often the simulated player was in the middle of a downswing of at least <i>X</i> BB, the second one how often he was in a downswing which lasted at least <i>X</i> hands.<br><i>In general these simulations underestimate the likelyhood and extent of downswings.</i></p>" +
            ("<p>Occurrence rates for downswing extents and downswing stretches for a player with a <i>" + (100 * a.b).toFixed(2) + " BB/100 winrate and a " + (10 * a.c).toFixed(2) + " BB/100 standard deviation</i>.</p>");
        document.getElementById("downswings-prelude").innerHTML = d;
        d = "<h3>Downswing extents</h3>";
        d += '<table class="regular-table">';
        for (c = 0; c < b.length; c++) 0 < b[c][1] && (d += "<tr><td>" + b[c][0] + "+ BB</td><td>" + (100 * b[c][1] / a.j).toFixed(2) + "% </td></tr>");
        d += "</table>";
        document.getElementById("downswings-explained").innerHTML =
            d;
        d = "<h3>Downswing stretches</h3>";
        d += '<table  class="regular-table">';
        for (c = 0; c < b.length; c++) 0 < f[c][1] && (d += "<tr><td>" + f[c][0] + "+ hands</td><td>" + (100 * f[c][1] / a.j).toFixed(2) + "% </td></tr>");
        d += "</table>";
        document.getElementById("stretches-explained").innerHTML = d
    }
    else s(a)
};
