/**
 * Main JS file for project.
 */

// Define globals that are added through the js.globals in
// the config.json file, here like this:
// /* global _ */

// Utility functions, such as Pym integration, number formatting,
// and device checking

//import utilsFn from './utils.js';
//utilsFn({ });


// Import local ES6 modules like this:
//import utilsFn from './utils.js';

// Or import libraries installed with npm like this:
// import module from 'module';

// Utilize templates on the client.  Get the main content template.
//import Content from '../templates/_index-content.svelte.html';
//
// Get the data parts that are needed.  For larger data points,
// utilize window.fetch.  Add the build = true option in the buildData
// options.
//import content from '../content.json';
// OR: let content = await (await window.fetch('./assets/data/content.json')).json();
//
// const app = new Content({
//   target: document.querySelector('.main-app-container'),
//   data: {
//     content
//   }
// });
import * as d3 from 'd3';
import * as c3 from 'c3';
import us from '../sources/counties.json';
import cd from '../sources/us_cd_mn_2012.json';
import dataCounties from '../sources/demographics.json';

//cpvi chart
function chartPVI() {
    var padding = {
        top: 20,
        right: 40,
        bottom: 20,
        left: 43,
    };

    var chartPVI = c3.generate({
        bindto: '#chartPVI',
        padding: padding,
        data: {
            x: 'x',
            columns: [
                ['x', 1982, 1986, 1990, 1994, 1998, 2002, 2006, 2010, 2014, 2018],
                ['Minnesota PVI', -7, -8, -8, -6, -4, -3, -2, -2, -2, -1]
            ],
            type: 'area'
        },
        point: {
            show: true,
            r: function(d) {
                if (d.x == 2022) {
                    return 6;
                } else {
                    return 0.5;
                }
            }
        },
        legend: {
            show: false
        },
        color: {
            pattern: ["#3F88C5"]
        },
        axis: {
            rotated: true,
            y: {
                max: 10,
                min: -10,
                // label: 'Minnesota Electoral Votes',
                padding: {
                    left: 0,
                    right: 0,
                    bottom: 0,
                    top: 0
                },
                tick: {
                    count: 11,
                    values: [-10, -8, -6, -4, -2, 0, 2, 4, 6, 8, 10],
                    format: function(d) {
                        if (d < 0) {
                            return "D+" + (d * -1);
                        } else if (d > 0) {
                            return "R+" + (d * 1);
                        } else if (d == 0) {
                            return "EVEN";
                        }
                    }
                }
            },
            x: {
                padding: {
                    left: 0,
                    right: 0,
                    bottom: 0,
                    top: 0
                },
                tick: {
                    values: [1982, 1986, 1990, 1994, 1998, 2002, 2006, 2010, 2014, 2018],
                    count: 5,
                    multiline: false
                },
            }
        },
        grid: {
            focus: {
                show: false
            },
            y: {
                lines: [{
                    value: 0,
                    text: '',
                    position: 'start',
                    class: 'powerline'
                }]

            }
        },
        tooltip: {
            contents: function(d, defaultTitleFormat, defaultValueFormat, color) {
                return '<div class="chart-tooltip d4">' +
                    '<span class="tooltip-label">' + d[0].x + ':</span>' +
                    '<span class="tooltip-value">' + defaultValueFormat(d[0].value) + '</span>' +
                    '</div>';
            }
        }
    });


}

chartPVI();

//trump popularity chart
function trumpChart() {

    var padding = {
        top: 20,
        right: 60,
        bottom: 20,
        left: 100,
    };

    var trumpChart = c3.generate({
        bindto: "#partyChart",
        padding: padding,
        data: {
            columns: [
                ['Approval', 0.39, 0.01, 0.04, 0.27, 0.32, 0.40, 0.42, 0.46, 0.86, 0.95]
            ],
            type: 'bar',
            labels: {
                format: {
                    'Approval': d3.format('.0%')
                    // 'GOP': d3.format('%'),
                    // 'IND': d3.format('%')
                }
            }
        },
        legend: {
            show: false
        },
        bar: {
            width: {
                ratio: 0.6
            }
        },
        tooltip: {
            show: false
        },
        color: {
            pattern: ['#A52129']
        },
        axis: {
            rotated: true,
            y: {
                max: 1,
                min: 0,
                padding: {
                    bottom: 0,
                    top: 0
                },
                tick: {
                    count: 4,
                    values: [0, 0.25, 0.50, 0.75, 1],
                    format: d3.format('.0%')
                }
            },
            x: {
                type: 'category',
                categories: ['Statewide', 'Clinton Voters', 'DFL', 'Independents', 'Hennepin/Ramsey', 'Metro Suburbs', 'Southern MN', 'Northern MN', 'Trump Voters', 'GOP']
            }
        },
        grid: {
            y: {
                lines: [{
                    value: 0.5,
                    text: '',
                    position: 'start',
                    class: 'powerline'
                }]
            }
        }

    });

    // d3.selectAll(".c3-target-DEM")
    //     .selectAll(".c3-bar, .c3-texts")
    //     .attr("transform", "translate(-10, 0)");

    // d3.selectAll(".c3-target-IND")
    //     .selectAll(".c3-bar, .c3-texts")
    //     .attr("transform", "translate(10, 0)");

}

trumpChart();

//split ticket chart
function chartShift() {
    var padding = {
        top: 20,
        right: 40,
        bottom: 20,
        left: 40,
    };

    var chartShift = c3.generate({
        bindto: "#chartShift",
        padding: padding,
        data: {
            x: 'x',
            columns: [
                ['x', 2000, 2002, 2004, 2006, 2008, 2010, 2012, 2014, 2016, 2018],
                ['SPLIT BALLOTS', 0.076287131, 0.110137169, 0.025319079, 0.114211272, 0.091539994, 0.010802393, 0.047668746, 0.018830822, 0.019724888, null]
                // ['GOV',null,0.079115266,null,0.009581754,null,-0.004162275,null,-0.055611859,null,null],
                // ['REPM',null,-0.031021903,null,-0.104629518,null,-0.014964668,null,-0.036781037,null,null],
                // ['PREZ',-0.02403249,null,-0.034761521,null,-0.102373617,null,-0.07694102,null,-0.015201305,null],
                // ['REP',-0.100319621,null,-0.0601,null,-0.193913611,null,-0.124609767,null,-0.034926193,null]
            ],
            type: 'line',
            // groups: [['DFL', 'GOP','IND']],
            labels: {
                format: {
                    // 'DFL': d3.format(',.0f'),
                    // 'GOP': d3.format(',.0f'),
                    // 'IND': d3.format(',.0f')
                }
            },
            transition: {
                duration: 400
            },
            colors: {
                'SPLIT BALLOTS': '#333333'
            }
        },
        // tooltip: {
        //     show: false
        // },
        line: {
            connectNull: true
        },
        legend: {
            show: false
        },
        point: {
            show: true,
            r: function(d) {
                if (d.x == 2016) {
                    return 6;
                } else {
                    return 2;
                }
            }
        },
        axis: {
            rotated: false,
            y: {
                max: 0.20,
                min: 0,
                padding: {
                    bottom: 0,
                    top: 0
                },
                tick: {
                    count: 5,
                    format: d3.format('.0%'),
                    values: [-0.20, -0.10, 0, 0.10, 0.20],
                    //  format: function (d) {
                    //         if (d < 0) {
                    //             return "D+" + (d * 100 * -1);
                    //         } else if (d > 0) {
                    //             return "R+" + (d * 100* 1);
                    //         } else if (d == 0) {
                    //             return "EVEN";
                    //         }
                    //     }
                }
            },
            x: {
                padding: {
                    right: 0,
                    left: 0
                },
                tick: {
                    count: 6,
                    values: [2000, 2002, 2004, 2006, 2008, 2010, 2012, 2014, 2016, 2018],
                    format: d3.format('.0f'),
                    rotate: -75,
                    multiline: false
                },
                height: 40
            }
        },
        grid: {
            focus: {
                show: false
            },
            y: {
                lines: [{
                    value: 0,
                    class: 'powerline'
                }]
            }
        },
        tooltip: {
            contents: function(d, defaultTitleFormat, defaultValueFormat, color) {
                return '<div class="chart-tooltip gray5"><span class="tooltip-label">' + d[0].x + ':</span>' +
                    '<span class="tooltip-value">' + defaultValueFormat(d[0].value) + '</span></div>';
            }
        }
    });
}

chartShift();

//trump country maps
function mapTipsDemo(d, subject, race, dataCompare) {
    for (var i = 0; i < dataCompare.length; i++) {
        if (dataCompare[i].DistrictNumber == d.properties.COUNTYNAME) {
            if (subject == "flips") {
                var dataPoint = d3.format("+.0%")(dataCompare[i].trump_margin) + " Trump margin";
            }
            if (subject == "religion") {
                var dataPoint = dataCompare[i].adherent_pct + "% religious adherence";
            }
            if (subject == "age") {
                var dataPoint = dataCompare[i].median_age + " median age";
            }
            if (subject == "income") {
                var dataPoint = d3.format("$,")(dataCompare[i].income) + " median income";
            }
            if (subject == "education") {
                var dataPoint = d3.format(".0%")(dataCompare[i].bachelors_pct + dataCompare[i].grad_degree_pct) + " with bachelor's or higher";
            }
            if (subject == "minority") {
                var dataPoint = d3.format(".0%")(dataCompare[i].minority_pct) + " minority population";
            }

            return "<strong>" + dataCompare[i].DistrictNumber + " County</strong><div class='" + mapColorDemo(d, subject, race, dataCompare) + "'>" + dataPoint + "</div>";
        }
    }
    // return  "<strong>" + d.properties.COUNTYNAME + "</strong>"; 
}

function mapColorDemo(d, subject, race, dataCompare) {
    if (race == "demographics") {
        for (var i = 0; i < dataCompare.length; i++) {
            if (dataCompare[i].DistrictNumber == d.properties.COUNTYNAME) {
                if (subject == "flips") {
                    if (dataCompare[i].shaded == 3) {
                        return "r3";
                    } else if (dataCompare[i].shaded == 2) {
                        return "red3";
                    } else if (dataCompare[i].shaded == 1) {
                        return "d4";
                    }
                }
                if (subject == "religion") {
                    if (dataCompare[i].adherent_pct >= 70) {
                        return "gray5";
                    } else if (dataCompare[i].adherent_pct >= 50) {
                        return "gray4";
                    } else if (dataCompare[i].adherent_pct >= 30) {
                        return "gray3";
                    } else if (dataCompare[i].adherent_pct > 0) {
                        return "gray2";
                    }
                }
                if (subject == "age") {
                    if (dataCompare[i].median_age >= 45) {
                        return "gray5";
                    } else if (dataCompare[i].median_age >= 40) {
                        return "gray4";
                    } else if (dataCompare[i].median_age >= 35) {
                        return "gray3";
                    } else if (dataCompare[i].median_age > 0) {
                        return "gray2";
                    }
                }
                if (subject == "income") {
                    if (dataCompare[i].income >= 70000) {
                        return "gray5";
                    } else if (dataCompare[i].income >= 55000) {
                        return "gray4";
                    } else if (dataCompare[i].income >= 45000) {
                        return "gray3";
                    } else if (dataCompare[i].income > 0) {
                        return "gray2";
                    }
                }
                if (subject == "education") {
                    if ((dataCompare[i].bachelors_pct + dataCompare[i].grad_degree_pct) >= .30) {
                        return "gray5";
                    } else if ((dataCompare[i].bachelors_pct + dataCompare[i].grad_degree_pct) >= .25) {
                        return "gray4";
                    } else if ((dataCompare[i].bachelors_pct + dataCompare[i].grad_degree_pct) >= .15) {
                        return "gray3";
                    } else if ((dataCompare[i].bachelors_pct + dataCompare[i].grad_degree_pct) > 0) {
                        return "gray2";
                    }
                }
                if (subject == "minority") {
                    if (dataCompare[i].minority_pct >= .30) {
                        return "gray5";
                    } else if (dataCompare[i].minority_pct >= .20) {
                        return "gray4";
                    } else if (dataCompare[i].minority_pct >= .10) {
                        return "gray3";
                    } else if (dataCompare[i].minority_pct > 0) {
                        return "gray2";
                    }
                }
            }
        }
    }
}

function mapBuildDemo(container, subject, chartContainer, shape, race, geo, dataCompare, index) {

    d3.helper = {};

    d3.helper.tooltip = function(accessor) {
        return function(selection) {
            var tooltipDiv;
            var bodyNode = d3.select('body').node();
            selection.on("mouseover", function(d, i) {
                    // Clean up lost tooltips
                    d3.select('body').selectAll('div.tooltip').remove();
                    // Append tooltip
                    tooltipDiv = d3.select('body').append('div').attr('class', 'tooltip');
                    var absoluteMousePos = d3.mouse(bodyNode);
                    tooltipDiv.style('left', (absoluteMousePos[0] + 10) + 'px')
                        .style('top', (absoluteMousePos[1] - 15) + 'px')
                        .style('position', 'absolute')
                        .style('z-index', 1001);
                    // Add text using the accessor function
                    var tooltipText = accessor(d, i) || '';
                    // Crop text arbitrarily
                    //tooltipDiv.style('width', function(d, i){return (tooltipText.length > 80) ? '300px' : null;})
                    //    .html(tooltipText);
                })
                .on('mousemove', function(d, i) {
                    // Move tooltip
                    var absoluteMousePos = d3.mouse(bodyNode);
                    tooltipDiv.style('left', (absoluteMousePos[0] + 10) + 'px')
                        .style('top', (absoluteMousePos[1] - 15) + 'px');
                    var tooltipText = accessor(d, i) || '';
                    tooltipDiv.html(tooltipText);
                })
                .on("mouseout", function(d, i) {
                    // Remove tooltip
                    tooltipDiv.remove();
                });

        };
    };

    var width = 200,
        height = 200,
        centered;

    if (geo == "us") {
        var projection = d3.geoAlbers().scale(700).translate([330, 200]);
    } else if (geo == "mn") {
        var projection = d3.geoAlbers().scale(5037).translate([50, 970]);
    } else if (geo == "metro") {
        var projection = d3.geoMercator().scale([16800]).center([-92.403259, 44.988113]);
    }

    var path = d3.geoPath()
        .projection(projection);

    var svg = d3.select(container + " svg")
        .attr("width", width)
        .attr("height", height);

    // svg.append("rect")
    //     .attr("class", "background")
    //     .attr("width", width)
    //     .attr("height", height);

    var g = svg.append("g");

    g.append("g")
        .attr("class", "counties")
        .selectAll("path")
        .data(us.features)
        .enter().append("path")
        .attr("d", path)
        // .on("click", clicked)
        // .attr("id", function(d) { var str = d.properties.COUNTYNAME; return str.replace(new RegExp(" ", "g"),"-"); })
        .attr("precinctName", function(d) {
            return d.properties.COUNTYNAME
        })
        .attr("class", function(d) {
            return "counties " + mapColorDemo(d, subject, race, dataCompare);
        })
        .style("stroke-width", "2px")
        // .style("stroke", "transparent")
        .call(d3.helper.tooltip(function(d, i) {
            if (race == "demographics") {
                return mapTipsDemo(d, subject, race, dataCompare);
            } else {
                return mapTips(d, race, dataCompare);
            }
        }));

    g.append("path")
        //.datum(topojson.mesh(us, us.features, function(a, b) { return a !== b; }))
        .attr("id", "state-borders")
        .attr("d", path);


    g.append("g")
        .attr("class", "states")
        .selectAll("path")
        .data(cd.features)
        .enter().append("path")
        .attr("d", path)
        .attr("precinctName", function(d) {
            return d.properties.COUNTYNAME
        })
        .attr("class", "empty")
        .style("stroke-width", "2px")
        .style("stroke", "#ffffff");

    g.append("path")
        .attr("id", "state-borders")
        .attr("d", path);

    // var zoom = d3.behavior.zoom()
    //     .on("zoom",function() {
    //         g.attr("transform","translate("+ 
    //             d3.event.translate.join(",")+")scale("+d3.event.scale+")");
    //         g.selectAll("circle")
    //             .attr("d", path.projection(projection));
    //         g.selectAll("path")  
    //             .attr("d", path.projection(projection)); 

    //   });

}

var dataDemo = dataCounties.demographics;

mapBuildDemo("#flipsMap", "flips", "#chart", "counties.json", "demographics", "mn", dataDemo, 0);
mapBuildDemo("#religionMapR", "religion", "#chart", "counties.json", "demographics", "mn", dataDemo, 0);
mapBuildDemo("#ageMapR", "age", "#chart", "counties.json", "demographics", "mn", dataDemo, 0);
mapBuildDemo("#incomeMapR", "income", "#chart", "counties.json", "demographics", "mn", dataDemo, 0);
mapBuildDemo("#educationMapR", "education", "#chart", "counties.json", "demographics", "mn", dataDemo, 0);
mapBuildDemo("#minorityMapR", "minority", "#chart", "counties.json", "demographics", "mn", dataDemo, 0);