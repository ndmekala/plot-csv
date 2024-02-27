const sampleData = {
  "type": "scatter",
  "data": {
    "datasets": [
      {
        "label": "y1",
        "data": [
          { "x": "8", "y": "0" },
          { "x": "7", "y": "1" },
          { "x": "6", "y": "4" },
          { "x": "5", "y": "9" },
          { "x": "4", "y": "16" },
          { "x": "3", "y": "25" },
          { "x": "2", "y": "36" },
          { "x": "1", "y": "49" },
          { "x": "0", "y": "64" }
        ],
        "borderColor": "#af005f",
        "backgroundColor": "#af005f"
      },
      {
        "label": "y2",
        "data": [
          { "x": "8", "y": "0" },
          { "x": "7", "y": "2" },
          { "x": "6", "y": "8" },
          { "x": "5", "y": "18" },
          { "x": "4", "y": "32" },
          { "x": "3", "y": "50" },
          { "x": "2", "y": "72" },
          { "x": "1", "y": "98" },
          { "x": "0", "y": "128" }
        ],
        "borderColor": "#ff5faf",
        "backgroundColor": "#ff5faf"
      },
      {
        "label": "y3",
        "data": [
          { "x": "8", "y": "0" },
          { "x": "7", "y": "3" },
          { "x": "6", "y": "12" },
          { "x": "5", "y": "27" },
          { "x": "4", "y": "48" },
          { "x": "3", "y": "75" },
          { "x": "2", "y": "108" },
          { "x": "1", "y": "147" },
          { "x": "0", "y": "192" }
        ],
        "borderColor": "#af87d7",
        "backgroundColor": "#af87d7"
      },
      {
        "label": "y4",
        "data": [
          { "x": "8", "y": "0" },
          { "x": "7", "y": "4" },
          { "x": "6", "y": "16" },
          { "x": "5", "y": "36" },
          { "x": "4", "y": "64" },
          { "x": "3", "y": "100" },
          { "x": "2", "y": "144" },
          { "x": "1", "y": "196" },
          { "x": "0", "y": "256" }
        ],
        "borderColor": "#5fafd7",
        "backgroundColor": "#5fafd7"
      },
      {
        "label": "y5",
        "data": [
          { "x": "8", "y": "0" },
          { "x": "7", "y": "5" },
          { "x": "6", "y": "20" },
          { "x": "5", "y": "45" },
          { "x": "4", "y": "80" },
          { "x": "3", "y": "125" },
          { "x": "2", "y": "180" },
          { "x": "1", "y": "245" },
          { "x": "0", "y": "320" }
        ],
        "borderColor": "#00afaf",
        "backgroundColor": "#00afaf"
      },
      {
        "label": "y6",
        "data": [
          { "x": "8", "y": "0" },
          { "x": "7", "y": "6" },
          { "x": "6", "y": "24" },
          { "x": "5", "y": "54" },
          { "x": "4", "y": "96" },
          { "x": "3", "y": "150" },
          { "x": "2", "y": "216" },
          { "x": "1", "y": "294" },
          { "x": "0", "y": "384" }
        ],
        "borderColor": "#5f8787",
        "backgroundColor": "#5f8787"
      },
      {
        "label": "y7",
        "data": [
          { "x": "8", "y": "0" },
          { "x": "7", "y": "7" },
          { "x": "6", "y": "28" },
          { "x": "5", "y": "63" },
          { "x": "4", "y": "112" },
          { "x": "3", "y": "175" },
          { "x": "2", "y": "252" },
          { "x": "1", "y": "343" },
          { "x": "0", "y": "448" }
        ],
        "borderColor": "#5faf5f",
        "backgroundColor": "#5faf5f"
      },
      {
        "label": "y8",
        "data": [
          { "x": "8", "y": "0" },
          { "x": "7", "y": "8" },
          { "x": "6", "y": "32" },
          { "x": "5", "y": "72" },
          { "x": "4", "y": "128" },
          { "x": "3", "y": "200" },
          { "x": "2", "y": "288" },
          { "x": "1", "y": "392" },
          { "x": "0", "y": "512" }
        ],
        "borderColor": "#d7875f",
        "backgroundColor": "#d7875f"
      }
    ]
  },
  "options": {
    "responsive": true,
    "showLine": true,
    "plugins": {
      "legend": {
        "labels": { "font": { "family": "Fira Code, monospace" } },
        "position": "bottom"
      }
    },
    "scales": {
      "x": {
        "grid": { "color": "#585858" },
        "type": "linear",
        "position": "bottom",
        "ticks": {
          "color": "#585858",
          "font": { "family": "Fira Code, monospace" }
        }
      },
      "y": {
        "grid": { "color": "#585858" },
        "ticks": {
          "color": "#585858",
          "font": { "family": "Fira Code, monospace" }
        }
      }
    }
  }
}
