# Mobile app stores Prometheus Exporter (iTunes & Google Play)

[![Build Status][travis-badge]][travis-url]
[![Docker Pulls][docker-badge]][docker-url]
[![Quality Gate Status][sonarcloud-status-badge]][sonarcloud-url]
[![Security Rating][sonarcloud-security-badge]][sonarcloud-url]
[![Maintainability Rating][sonarcloud-maintainability-badge]][sonarcloud-url]

[![Bugs][sonarcloud-bugs-badge]][sonarcloud-url]
[![Code Smells][sonarcloud-codesmells-badge]][sonarcloud-url]
[![Coverage][sonarcloud-coverage-badge]][sonarcloud-url]
[![Duplicated Lines (%)][sonarcloud-duplicated-badge]][sonarcloud-url]

[![License: MIT][badge-license]][link-license]

![Grafana dashboard that uses the App Stores Prometheus Exporter][image-dashboard-app]

This Prometheus exporter exports metrics (score, ratings, reviews, app version, etc.) from Apple iTunes and Google Play

It's based on [google-play-scraper][link-google-play-scraper] and [app-store-scraper][link-app-store-scraper] to help getting the data from the mobile app stores.

I'm looking to add more stores in the future (Microsoft Store, Amazon Appstore, etc.)

## Metrics supported by the exporter

For this early version, this Prometheus Exporter exports this data:

### iTunes

* **Score** from first version
* Total Number of **Reviews**
* **Current Version Score**
* **Current Version number of Reviews**

### Google Play

* **Score** from first version
* Total Number of **Reviews**
* Total Number of **Ratings**
* Total Number of **Ratings with 1 star**
* Total Number of **Ratings with 2 stars**
* Total Number of **Ratings with 3 stars**
* Total Number of **Ratings with 4 stars**
* Total Number of **Ratings with 5 stars**

## Metrics exposed to Prometheus

### Default collected metrics

``` text
process_cpu_user_seconds_total
process_cpu_system_seconds_total
process_cpu_seconds_total
process_start_time_seconds
process_resident_memory_bytes
nodejs_eventloop_lag_seconds
nodejs_active_handles_total
nodejs_active_requests_total
nodejs_heap_size_total_bytes
nodejs_heap_size_used_bytes
nodejs_external_memory_bytes
nodejs_heap_space_size_total_bytes{space="new"}
nodejs_heap_space_size_total_bytes{space="old"}
nodejs_heap_space_size_total_bytes{space="code"}
nodejs_heap_space_size_total_bytes{space="map"}
nodejs_heap_space_size_total_bytes{space="large_object"}
nodejs_heap_space_size_used_bytes{space="new"}
nodejs_heap_space_size_used_bytes{space="old"}
nodejs_heap_space_size_used_bytes{space="code"}
nodejs_heap_space_size_used_bytes{space="map"}
nodejs_heap_space_size_used_bytes{space="large_object"}
nodejs_heap_space_size_available_bytes{space="new"}
nodejs_heap_space_size_available_bytes{space="old"}
nodejs_heap_space_size_available_bytes{space="code"}
nodejs_heap_space_size_available_bytes{space="map"}
nodejs_heap_space_size_available_bytes{space="large_object"}
nodejs_version_info{version="v8.12.0",major="8",minor="12",patch="0"}
```

### iTunes Store

``` text
appstores_score_total{store="STORE",country="COUNTRY",app="BUNDLEID",version="VERSION"}
appstores_reviews_total{store="STORE",country="COUNTRY",app="BUNDLEID",version="VERSION"}
appstores_current_version_score_total{store="STORE",country="COUNTRY",app="BUNDLEID",version="VERSION"}
appstores_current_version_reviews_total{store="STORE",country="COUNTRY",app="BUNDLEID",version="VERSION"}
```

### Google Play Store

``` text
appstores_score_total{store="STORE",country="COUNTRY",app="APPID",version="VERSION"}
appstores_reviews_total{store="STORE",country="COUNTRY",app="APPID",version="VERSION"}
appstores_ratings_total{store="STORE",country="COUNTRY",app="APPID",version="VERSION"}
appstores_ratings_1_total{store="STORE",country="COUNTRY",app="APPID",version="VERSION"}
appstores_ratings_2_total{store="STORE",country="COUNTRY",app="APPID",version="VERSION"}
appstores_ratings_3_total{store="STORE",country="COUNTRY",app="APPID",version="VERSION"}
appstores_ratings_4_total{store="STORE",country="COUNTRY",app="APPID",version="VERSION"}
appstores_ratings_5_total{store="STORE",country="COUNTRY",app="APPID",version="VERSION"}
```

## Metrics output example

``` text
# HELP process_cpu_user_seconds_total Total user CPU time spent in seconds.
# TYPE process_cpu_user_seconds_total counter
process_cpu_user_seconds_total 0.001425 1542481797175

# HELP process_cpu_system_seconds_total Total system CPU time spent in seconds.
# TYPE process_cpu_system_seconds_total counter
process_cpu_system_seconds_total 0.000035 1542481797175

# HELP process_cpu_seconds_total Total user and system CPU time spent in seconds.
# TYPE process_cpu_seconds_total counter
process_cpu_seconds_total 0.00146 1542481797175

# HELP process_start_time_seconds Start time of the process since unix epoch in seconds.
# TYPE process_start_time_seconds gauge
process_start_time_seconds 1542481797

# HELP process_resident_memory_bytes Resident memory size in bytes.
# TYPE process_resident_memory_bytes gauge
process_resident_memory_bytes 47353856 1542481797175

# HELP nodejs_eventloop_lag_seconds Lag of event loop in seconds.
# TYPE nodejs_eventloop_lag_seconds gauge
nodejs_eventloop_lag_seconds 0.018619094 1542481797194

# HELP nodejs_active_handles_total Number of active handles.
# TYPE nodejs_active_handles_total gauge
nodejs_active_handles_total 2 1542481797175

# HELP nodejs_active_requests_total Number of active requests.
# TYPE nodejs_active_requests_total gauge
nodejs_active_requests_total 0 1542481797175

# HELP nodejs_heap_size_total_bytes Process heap size from node.js in bytes.
# TYPE nodejs_heap_size_total_bytes gauge
nodejs_heap_size_total_bytes 35737600 1542481797176

# HELP nodejs_heap_size_used_bytes Process heap size used from node.js in bytes.
# TYPE nodejs_heap_size_used_bytes gauge
nodejs_heap_size_used_bytes 20246392 1542481797176

# HELP nodejs_external_memory_bytes Nodejs external memory size in bytes.
# TYPE nodejs_external_memory_bytes gauge
nodejs_external_memory_bytes 682481 1542481797176

# HELP nodejs_heap_space_size_total_bytes Process heap space size total from node.js in bytes.
# TYPE nodejs_heap_space_size_total_bytes gauge
nodejs_heap_space_size_total_bytes{space="new"} 16777216 1542481797176
nodejs_heap_space_size_total_bytes{space="old"} 11882496 1542481797176
nodejs_heap_space_size_total_bytes{space="code"} 2097152 1542481797176
nodejs_heap_space_size_total_bytes{space="map"} 1069056 1542481797176
nodejs_heap_space_size_total_bytes{space="large_object"} 3911680 1542481797176

# HELP nodejs_heap_space_size_used_bytes Process heap space size used from node.js in bytes.
# TYPE nodejs_heap_space_size_used_bytes gauge
nodejs_heap_space_size_used_bytes{space="new"} 2709184 1542481797176
nodejs_heap_space_size_used_bytes{space="old"} 11619584 1542481797176
nodejs_heap_space_size_used_bytes{space="code"} 1274912 1542481797176
nodejs_heap_space_size_used_bytes{space="map"} 789448 1542481797176
nodejs_heap_space_size_used_bytes{space="large_object"} 3858896 1542481797176

# HELP nodejs_heap_space_size_available_bytes Process heap space size available from node.js in bytes.
# TYPE nodejs_heap_space_size_available_bytes gauge
nodejs_heap_space_size_available_bytes{space="new"} 5540160 1542481797176
nodejs_heap_space_size_available_bytes{space="old"} 1752 1542481797176
nodejs_heap_space_size_available_bytes{space="code"} 0 1542481797176
nodejs_heap_space_size_available_bytes{space="map"} 80 1542481797176
nodejs_heap_space_size_available_bytes{space="large_object"} 1463717376 1542481797176

# HELP nodejs_version_info Node.js version info.
# TYPE nodejs_version_info gauge
nodejs_version_info{version="v8.9.4",major="8",minor="9",patch="4"} 1

# HELP appstores_score_total App score since the launch of the app
# TYPE appstores_score_total gauge
appstores_score_total{store="itunes",country="us",app="com.burbn.instagram",version="71.0"} 5
appstores_score_total{store="itunes",country="gb",app="net.whatsapp.WhatsApp",version="2.18.102"} 4.5
appstores_score_total{store="itunes",country="us",app="net.whatsapp.WhatsApp",version="2.18.102"} 4.5
appstores_score_total{store="gplay",country="gb",app="com.whatsapp",version="Varies with device"} 4.4139547
appstores_score_total{store="gplay",country="us",app="com.whatsapp",version="Varies with device"} 4.413925
appstores_score_total{store="gplay",country="us",app="com.instagram.android",version="Varies with device"} 4.5174627

# HELP appstores_reviews_total App reviews since the launch of the app
# TYPE appstores_reviews_total gauge
appstores_reviews_total{store="itunes",country="us",app="com.burbn.instagram",version="71.0"} 13905276
appstores_reviews_total{store="itunes",country="gb",app="net.whatsapp.WhatsApp",version="2.18.102"} 1255459
appstores_reviews_total{store="itunes",country="us",app="net.whatsapp.WhatsApp",version="2.18.102"} 3983037
appstores_reviews_total{store="gplay",country="gb",app="com.whatsapp",version="Varies with device"} 19679705
appstores_reviews_total{store="gplay",country="us",app="com.whatsapp",version="Varies with device"} 19675400
appstores_reviews_total{store="gplay",country="us",app="com.instagram.android",version="Varies with device"} 22037284

# HELP appstores_current_version_score_total App score for the current app version
# TYPE appstores_current_version_score_total gauge
appstores_current_version_score_total{store="itunes",country="us",app="com.burbn.instagram",version="71.0"} 5
appstores_current_version_score_total{store="itunes",country="gb",app="net.whatsapp.WhatsApp",version="2.18.102"} 4.5
appstores_current_version_score_total{store="itunes",country="us",app="net.whatsapp.WhatsApp",version="2.18.102"} 4.5

# HELP appstores_current_version_reviews_total App reviews for the current app version
# TYPE appstores_current_version_reviews_total gauge
appstores_current_version_reviews_total{store="itunes",country="us",app="com.burbn.instagram",version="71.0"} 88626
appstores_current_version_reviews_total{store="itunes",country="gb",app="net.whatsapp.WhatsApp",version="2.18.102"} 7782
appstores_current_version_reviews_total{store="itunes",country="us",app="net.whatsapp.WhatsApp",version="2.18.102"} 27318

# HELP appstores_ratings_total App ratings since the launch of the app
# TYPE appstores_ratings_total gauge
appstores_ratings_total{store="gplay",country="gb",app="com.whatsapp",version="Varies with device"} 77903899
appstores_ratings_total{store="gplay",country="us",app="com.whatsapp",version="Varies with device"} 77884480
appstores_ratings_total{store="gplay",country="us",app="com.instagram.android",version="Varies with device"} 72364272

# HELP appstores_ratings_1_total App ratings with 1 star since the launch of the app
# TYPE appstores_ratings_1_total gauge
appstores_ratings_1_total{store="gplay",country="gb",app="com.whatsapp",version="Varies with device"} 4697679
appstores_ratings_1_total{store="gplay",country="us",app="com.whatsapp",version="Varies with device"} 4696832
appstores_ratings_1_total{store="gplay",country="us",app="com.instagram.android",version="Varies with device"} 2896221

# HELP appstores_ratings_2_total App ratings with 2 stars since the launch of the app
# TYPE appstores_ratings_2_total gauge
appstores_ratings_2_total{store="gplay",country="gb",app="com.whatsapp",version="Varies with device"} 1912029
appstores_ratings_2_total{store="gplay",country="us",app="com.whatsapp",version="Varies with device"} 1911762
appstores_ratings_2_total{store="gplay",country="us",app="com.instagram.android",version="Varies with device"} 1322408

# HELP appstores_ratings_3_total App ratings with 3 stars since the launch of the app
# TYPE appstores_ratings_3_total gauge
appstores_ratings_3_total{store="gplay",country="gb",app="com.whatsapp",version="Varies with device"} 4936213
appstores_ratings_3_total{store="gplay",country="us",app="com.whatsapp",version="Varies with device"} 4934952
appstores_ratings_3_total{store="gplay",country="us",app="com.instagram.android",version="Varies with device"} 3928132

# HELP appstores_ratings_4_total App ratings with 4 stars since the launch of the app
# TYPE appstores_ratings_4_total gauge
appstores_ratings_4_total{store="gplay",country="gb",app="com.whatsapp",version="Varies with device"} 11255999
appstores_ratings_4_total{store="gplay",country="us",app="com.whatsapp",version="Varies with device"} 11253610
appstores_ratings_4_total{store="gplay",country="us",app="com.instagram.android",version="Varies with device"} 11510054

# HELP appstores_ratings_5_total App ratings with 5 stars since the launch of the app
# TYPE appstores_ratings_5_total gauge
appstores_ratings_5_total{store="gplay",country="gb",app="com.whatsapp",version="Varies with device"} 55101979
appstores_ratings_5_total{store="gplay",country="us",app="com.whatsapp",version="Varies with device"} 55087324
appstores_ratings_5_total{store="gplay",country="us",app="com.instagram.android",version="Varies with device"} 52707457
```

## Requirements

* NodeJS >=10

## Installation

### Docker image

#### Default with demo apps

The simplest way to test this Prometheus exporter is by using Docker. The command below will exports the metrics from the default apps from the `src/examples/apps.json`.

``` bash
docker-compose up
```

Now, you can see the Prometheus metrics from your browser or command line at [http://localhost:9514/metrics](http://localhost:9514/metrics)

``` bash
curl http://localhost:9514/metrics
```

#### Customize with yours apps

Simply copy the config files from the `src/examples` folder to the `config` folder (root of the project):

| From || To |
|---|---|---|
|src/examples/apps.json|=>|config/apps.json|
|src/examples/config.json|=>|config/config.json|

Now, restart the Docker container to see the changes:

``` bash
docker-compose down
docker-compose up
```

``` bash
curl http://localhost:9514/metrics
```

### NPM install

WIP

### From sources

``` bash
git clone git@github.com:timoa/app-stores-prometheus-exporter.git
cd app-stores-prometheus-exporter
npm install
```

Copy the configuration files

| From || To |
|---|---|---|
|src/examples/apps.json|=>|config/apps.json|
|src/examples/config.json|=>|config/config.json|

``` bash
mv src/examples/apps.json config/apps.json
mv src/examples/config.json config/config.json
```

Start the App Stores Prometheus Exporter:

``` bash
npm start
```

The console will output this message:

``` bash
Prometheus App Stores exporter is listening on http://localhost:9514
```

## Prometheus configuration

To configure Prometheus to pull the data of the App Stores exporter, you just need to add this job to your `prometheus.yml`:

``` yaml
global:
[...]

scrape_configs:
  - job_name: 'appstores'
    scrape_interval: 5m

    static_configs:
      - targets:
        - localhost:9514
```

### Scrape interval

Since the mobile app stores are using cache for the app details pages, it doesn't make sense to check the pages every 5s.

Depending of the number of apps you will monitor, it will be better to set the scrape interval to 5m or more.

## Dashboards

The following Grafana dashboards are available in the Grafana Dashboards repository and can be install in your own Grafana instance (just copy the ID to import it):

* [Mobile App Stores - Per App][link-grafana-dashboard-per-app]
* [Mobile App Stores - Score][link-grafana-dashboard-score]
* [Mobile App Stores - Reviews][link-grafana-dashboard-reviews]
* [Mobile App Stores - Versions][link-grafana-dashboard-versions]

## TODO

* Better test coverage
* Grafana dashboards screenshots and links
* Refactoring of the code to add more stores as plugins
* Simplify multiple countries configuration
* Add support to Mac App Store
* Add support to Microsoft Store
* Add support to Amazon Appstore

[sonarcloud]: https://sonarcloud.io/about
[travis-badge]: https://travis-ci.com/timoa/app-stores-prometheus-exporter.svg?branch=master
[travis-url]: https://travis-ci.com/timoa/app-stores-prometheus-exporter
[docker-badge]: https://img.shields.io/docker/pulls/timoa/app-stores-prometheus-exporter.svg
[docker-url]: https://hub.docker.com/r/timoa/app-stores-prometheus-exporter
[sonarcloud-url]: https://sonarcloud.io/dashboard?id=timoa_app-stores-prometheus-exporter
[sonarcloud-status-badge]: https://sonarcloud.io/api/project_badges/measure?project=timoa_app-stores-prometheus-exporter&metric=alert_status
[sonarcloud-security-badge]: https://sonarcloud.io/api/project_badges/measure?project=timoa_app-stores-prometheus-exporter&metric=security_rating
[sonarcloud-maintainability-badge]: https://sonarcloud.io/api/project_badges/measure?project=timoa_app-stores-prometheus-exporter&metric=sqale_rating
[sonarcloud-bugs-badge]: https://sonarcloud.io/api/project_badges/measure?project=timoa_app-stores-prometheus-exporter&metric=bugs
[sonarcloud-codesmells-badge]: https://sonarcloud.io/api/project_badges/measure?project=timoa_app-stores-prometheus-exporter&metric=code_smells
[sonarcloud-coverage-badge]: https://sonarcloud.io/api/project_badges/measure?project=timoa_app-stores-prometheus-exporter&metric=coverage
[sonarcloud-duplicated-badge]: https://sonarcloud.io/api/project_badges/measure?project=timoa_app-stores-prometheus-exporter&metric=duplicated_lines_density
[badge-license]: https://img.shields.io/badge/License-MIT-blue.svg
[image-dashboard-app]: https://raw.githubusercontent.com/timoa/app-stores-prometheus-exporter/master/doc/images/grafana-app-stores-per-app.png
[link-license]: https://raw.githubusercontent.com/timoa/app-stores-prometheus-exporter/master/LICENSE
[link-google-play-scraper]: https://github.com/facundoolano/google-play-scraper
[link-app-store-scraper]: https://github.com/facundoolano/app-store-scraper
[link-grafana-dashboards]: https://grafana.com/orgs/timoa/dashboards
[link-grafana-dashboard-per-app]: https://grafana.com/grafana/dashboards/10100
[link-grafana-dashboard-score]: https://grafana.com/grafana/dashboards/10820
[link-grafana-dashboard-reviews]: https://grafana.com/grafana/dashboards/10821
[link-grafana-dashboard-versions]: https://grafana.com/grafana/dashboards/10822
