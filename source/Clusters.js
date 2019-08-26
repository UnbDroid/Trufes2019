class Clusters {
   
   constructor() {
      this.points = [] 
   } 
   
   get_dist(lsb, msb) {
      if (msb == "80" || msb == "70"){
        return false
      }
    
      let dist = parseInt(msb+lsb, 16)/1000.0
    
      return dist
    }

    get_angle(bytes){
        let theta = (parseInt(bytes[1], 16) - 160) * 4
        theta = (theta - 98.5) % 360
        return theta
    }

    add_point(dist, theta) {
        // console.log("Ponto adicionado")
        // console.log(dist)
        if (dist != false && dist < 6){
            
            let x = dist*Math.cos((theta+90) * Math.PI/180)
            let y = dist*Math.sin((theta+90) * Math.PI/180)
            // if (y > 0 && y < 1) {
            //     if (x < 1 && x > -1) {
                    // console.log("Entro aqui2")
            this.points.push([x, y]) //, dist, theta
            //     }
            // }
        }
    }
    
    process_line(string) {
        string = string.replace('\n', '');

        let bytes = string.split(":").slice(0,22);
        if (bytes.length == 22){
            let angle = this.get_angle(bytes)
            this.add_point(this.get_dist(bytes[4], bytes[5]), angle)
            this.add_point(this.get_dist(bytes[8], bytes[9]), angle + 1)
            this.add_point(this.get_dist(bytes[12], bytes[13]), angle + 2)
            this.add_point(this.get_dist(bytes[16], bytes[17]), angle + 3)
        }
    }
    
    calc_centroid(cluster) {
      let sum_x = 0.0
      let sum_y = 0.0
      let num_ele = cluster.length
      for (var i in cluster) {
        sum_x += cluster[i][0]
        sum_y += cluster[i][1]
      }
      let centroid = [(sum_x/num_ele), (sum_y/num_ele)]
    
      return centroid
    }
    
    find_pos(centroids) {
      for (var centroid in centroids) {
        let dist_x = Math.ceil(centroids[centroid][0] / 0.2)
        let dist_y = Math.ceil(centroids[centroid][1] / 0.2)
        // console.log(dist_x)
        // console.log(dist_y)
      }
    }
    
    read_lines(lines) {
        for (var line in lines) {
            this.process_line(lines[line])
        }
        this.DBSCAN()
    }
  
    DBSCAN() {
        var clustering = require('./DBSCAN');
        // console.log(clustering)
        var dbscan = new clustering()
        // console.log("Points " + this.points)
        var clusters = dbscan.run(this.points, 0.15, 30);
        let new_clusters = []
        let centroids = []
        for (var cluster in clusters){
            let new_cluster = []
            for (var point in clusters[cluster]) {
                new_cluster.push([this.points[clusters[cluster][point]][0],
                                  this.points[clusters[cluster][point]][1]])
            }
            new_clusters.push(new_cluster)
            centroids.push(this.calc_centroid(new_cluster))
        }

        let new_noise = []
        for (var point in dbscan.noise) {
            new_noise.push([this.points[dbscan.noise[point]][0],
                            this.points[dbscan.noise[point]][1]])
        }
        this.find_pos(centroids)
        this.plot(new_clusters, centroids, new_noise)
    }
    
    plot(clusters, centroids, noise) {
      var plotData =[]
    
      var layout = {
          title: 'Map',
          xaxis: {
            title: 'X'
          },
          yaxis: {
            title: 'Y'
          }
        };
    
      if (centroids != undefined) {
        var centroidTrace = {
          x: centroids.map(function(c) { return c[0]; }),
          y: centroids.map(function(c) { return c[1]; }),
          mode: 'markers',
          type: 'scatter',
          name: 'Centroids',
          marker: {
            color: '#000000',
            symbol: 'cross',
            size: 10
          }
        }
        plotData.push(centroidTrace);
      }
    
      if (noise != undefined) {
        var noiseTrace = {
          x: noise.map(function(c) { return c[0]; }),
          y: noise.map(function(c) { return c[1]; }),
          mode: 'markers',
          type: 'scatter',
          name: 'Noise',
          marker: {
            color: '#777777'
          }
        }
        plotData.push(noiseTrace);
      }
    
      clusters.forEach(function(cluster, index) {
         var trace = {
           x: cluster.map(function(c) { return c[0]; }),
           y: cluster.map(function(c) { return c[1]; }),
           mode: 'markers',
           type: 'scatter',
           name: 'Cluster ' + index
         }
         plotData.push(trace);
       });
    
      var graphOptions = {layout: layout, filename: 'boxes', fileopt: 'overwrite'};
      var plotly = require('plotly')("Skalwalker", "OhjVyaqld2iLbFzzcw1X")
      plotly.plot(plotData, graphOptions, function (err, msg) {
        if (err) {
          console.log(err);
          process.exit(3);
        } else {
          console.log('Success! The plot (' + msg.filename + ') can be found at ' + msg.url);
          process.exit();
        }
      });
    }
}

module.exports = Clusters;