# Mobile app stores Prometheus Exporter (iTunes & Google Play)

[![Build Status][github-badge]][github-url]
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

Currently, the Prometheus Exporter exports these datas:

| Metric | iTunes | Google Play |
|--------|--------|-------------|
| Score since first version | ✅ | ✅ |
| Current Version Score | ✅ | ❌ |
| Current Version number of Reviews | ✅ | ❌ |
| Total Number of Reviews | ✅ | ✅ |
| Total Number of Ratings | ✅ | ✅ |
| Total Number of Ratings with 1 star | ✅ | ✅ |
| Total Number of Ratings with 2 stars | ✅ | ✅ |
| Total Number of Ratings with 3 stars | ✅ | ✅ |
| Total Number of Ratings with 4 stars | ✅ | ✅ |
| Total Number of Ratings with 5 stars | ✅ | ✅ |
| Minimum Active Installs | ❌ | ✅ |
| Maximum Active Installs | ❌ | ✅ |

## Metrics exposed to Prometheus

### Default collected metrics

``` text
process_cpu_user_seconds_total
process_cpu_system_seconds_total
process_cpu_seconds_total
process_start_time_seconds
process_resident_memory_bytes
nodejs_eventloop_lag_seconds
nodejs_eventloop_lag_min_seconds
nodejs_eventloop_lag_max_seconds
nodejs_eventloop_lag_mean_seconds
nodejs_eventloop_lag_stddev_seconds
nodejs_eventloop_lag_p50_seconds
nodejs_eventloop_lag_p90_seconds
nodejs_eventloop_lag_p99_seconds
nodejs_active_handles{type="Pipe"}
nodejs_active_handles{type="Socket"}
nodejs_active_handles{type="Server"}
nodejs_active_handles_total
nodejs_active_requests_total
nodejs_heap_size_total_bytes
nodejs_heap_size_used_bytes
nodejs_external_memory_bytes
nodejs_heap_space_size_total_bytes{space="read_only"}
nodejs_heap_space_size_total_bytes{space="new"}
nodejs_heap_space_size_total_bytes{space="old"}
nodejs_heap_space_size_total_bytes{space="code"}
nodejs_heap_space_size_total_bytes{space="map"}
nodejs_heap_space_size_total_bytes{space="large_object"}
nodejs_heap_space_size_total_bytes{space="code_large_object"}
nodejs_heap_space_size_total_bytes{space="new_large_object"}
nodejs_heap_space_size_used_bytes{space="read_only"}
nodejs_heap_space_size_used_bytes{space="new"}
nodejs_heap_space_size_used_bytes{space="old"}
nodejs_heap_space_size_used_bytes{space="code"}
nodejs_heap_space_size_used_bytes{space="map"}
nodejs_heap_space_size_used_bytes{space="large_object"}
nodejs_heap_space_size_used_bytes{space="code_large_object"}
nodejs_heap_space_size_used_bytes{space="new_large_object"}
nodejs_heap_space_size_available_bytes{space="read_only"}
nodejs_heap_space_size_available_bytes{space="new"}
nodejs_heap_space_size_available_bytes{space="old"}
nodejs_heap_space_size_available_bytes{space="code"}
nodejs_heap_space_size_available_bytes{space="map"}
nodejs_heap_space_size_available_bytes{space="large_object"}
nodejs_heap_space_size_available_bytes{space="code_large_object"}
nodejs_heap_space_size_available_bytes{space="new_large_object"}
nodejs_version_info{version="v16.14.2",major="16",minor="14",patch="2"}
nodejs_gc_duration_seconds_bucket{le="0.001",kind="incremental"}
nodejs_gc_duration_seconds_bucket{le="0.01",kind="incremental"}
nodejs_gc_duration_seconds_bucket{le="0.1",kind="incremental"}
nodejs_gc_duration_seconds_bucket{le="1",kind="incremental"}
nodejs_gc_duration_seconds_bucket{le="2",kind="incremental"}
nodejs_gc_duration_seconds_bucket{le="5",kind="incremental"}
nodejs_gc_duration_seconds_bucket{le="+Inf",kind="incremental"}
nodejs_gc_duration_seconds_sum{kind="incremental"}
nodejs_gc_duration_seconds_count{kind="incremental"}
nodejs_gc_duration_seconds_bucket{le="0.001",kind="major"}
nodejs_gc_duration_seconds_bucket{le="0.01",kind="major"}
nodejs_gc_duration_seconds_bucket{le="0.1",kind="major"}
nodejs_gc_duration_seconds_bucket{le="1",kind="major"}
nodejs_gc_duration_seconds_bucket{le="2",kind="major"}
nodejs_gc_duration_seconds_bucket{le="5",kind="major"}
nodejs_gc_duration_seconds_bucket{le="+Inf",kind="major"}
nodejs_gc_duration_seconds_sum{kind="major"}
nodejs_gc_duration_seconds_count{kind="major"}
nodejs_gc_duration_seconds_bucket{le="0.001",kind="minor"}
nodejs_gc_duration_seconds_bucket{le="0.01",kind="minor"}
nodejs_gc_duration_seconds_bucket{le="0.1",kind="minor"}
nodejs_gc_duration_seconds_bucket{le="1",kind="minor"}
nodejs_gc_duration_seconds_bucket{le="2",kind="minor"}
nodejs_gc_duration_seconds_bucket{le="5",kind="minor"}
nodejs_gc_duration_seconds_bucket{le="+Inf",kind="minor"}
nodejs_gc_duration_seconds_sum{kind="minor"}
nodejs_gc_duration_seconds_count{kind="minor"}
```

### iTunes Store

``` text
appstores_score_total{store="itunes",country="COUNTRY",app="BUNDLEID",version="VERSION"}
appstores_reviews_total{store="itunes",country="COUNTRY",app="BUNDLEID",version="VERSION"}
appstores_current_version_score_total{store="itunes",country="COUNTRY",app="BUNDLEID",version="VERSION"}
appstores_current_version_reviews_total{store="itunes",country="COUNTRY",app="BUNDLEID",version="VERSION"}
appstores_ratings_total{store="itunes",country="COUNTRY",app="APPID",version="VERSION"}
appstores_ratings_1_total{store="itunes",country="COUNTRY",app="APPID",version="VERSION"}
appstores_ratings_2_total{store="itunes",country="COUNTRY",app="APPID",version="VERSION"}
appstores_ratings_3_total{store="itunes",country="COUNTRY",app="APPID",version="VERSION"}
appstores_ratings_4_total{store="itunes",country="COUNTRY",app="APPID",version="VERSION"}
appstores_ratings_5_total{store="itunes",country="COUNTRY",app="APPID",version="VERSION"}
```

### Google Play Store

``` text
appstores_score_total{store="gplay",country="COUNTRY",app="APPID",version="VERSION"}
appstores_reviews_total{store="gplay",country="COUNTRY",app="APPID",version="VERSION"}
appstores_ratings_total{store="gplay",country="COUNTRY",app="APPID",version="VERSION"}
appstores_ratings_1_total{store="gplay",country="COUNTRY",app="APPID",version="VERSION"}
appstores_ratings_2_total{store="gplay",country="COUNTRY",app="APPID",version="VERSION"}
appstores_ratings_3_total{store="gplay",country="COUNTRY",app="APPID",version="VERSION"}
appstores_ratings_4_total{store="gplay",country="COUNTRY",app="APPID",version="VERSION"}
appstores_ratings_5_total{store="gplay",country="COUNTRY",app="APPID",version="VERSION"}
appstores_min_active_installs{store="gplay",country="COUNTRY",app="APPID",version="VERSION"}
appstores_max_active_installs{store="gplay",country="COUNTRY",app="APPID",version="VERSION"}
```

## Metrics output example

``` text
[...]

# HELP appstores_score_total App score since the launch of the app
# TYPE appstores_score_total gauge
appstores_score_total{store="itunes",country="us",app="net.whatsapp.WhatsApp",version="22.7.80"} 4.69536
appstores_score_total{store="itunes",country="us",app="com.burbn.instagram",version="228.0"} 4.74342
appstores_score_total{store="itunes",country="gb",app="net.whatsapp.WhatsApp",version="22.7.80"} 4.69854
appstores_score_total{store="gplay",country="us",app="com.whatsapp",version="2.22.7.74"} 4.2947626
appstores_score_total{store="gplay",country="us",app="com.instagram.android",version="Varies with device"} 4.0539274
appstores_score_total{store="gplay",country="gb",app="com.whatsapp",version="2.22.7.74"} 4.2890716

# HELP appstores_reviews_total App reviews since the launch of the app
# TYPE appstores_reviews_total gauge
appstores_reviews_total{store="itunes",country="us",app="net.whatsapp.WhatsApp",version="22.7.80"} 9898794
appstores_reviews_total{store="itunes",country="us",app="com.burbn.instagram",version="228.0"} 22806478
appstores_reviews_total{store="itunes",country="gb",app="net.whatsapp.WhatsApp",version="22.7.80"} 2505037
appstores_reviews_total{store="gplay",country="us",app="com.whatsapp",version="2.22.7.74"} 1796947
appstores_reviews_total{store="gplay",country="us",app="com.instagram.android",version="Varies with device"} 4337335
appstores_reviews_total{store="gplay",country="gb",app="com.whatsapp",version="2.22.7.74"} 682822

# HELP appstores_ratings_total App ratings since the launch of the app
# TYPE appstores_ratings_total gauge
appstores_ratings_total{store="itunes",country="us",app="net.whatsapp.WhatsApp",version="22.7.80"} 9903510
appstores_ratings_total{store="itunes",country="us",app="com.burbn.instagram",version="228.0"} 22806478
appstores_ratings_total{store="itunes",country="gb",app="net.whatsapp.WhatsApp",version="22.7.80"} 2505968
appstores_ratings_total{store="gplay",country="us",app="com.whatsapp",version="2.22.7.74"} 159650351
appstores_ratings_total{store="gplay",country="us",app="com.instagram.android",version="Varies with device"} 133666117
appstores_ratings_total{store="gplay",country="gb",app="com.whatsapp",version="2.22.7.74"} 159649715

# HELP appstores_ratings_1_total App ratings with 1 star since the launch of the app
# TYPE appstores_ratings_1_total gauge
appstores_ratings_1_total{store="itunes",country="us",app="net.whatsapp.WhatsApp",version="22.7.80"} 290260
appstores_ratings_1_total{store="itunes",country="us",app="com.burbn.instagram",version="228.0"} 626005
appstores_ratings_1_total{store="itunes",country="gb",app="net.whatsapp.WhatsApp",version="22.7.80"} 56262
appstores_ratings_1_total{store="gplay",country="us",app="com.whatsapp",version="2.22.7.74"} 16970531
appstores_ratings_1_total{store="gplay",country="us",app="com.instagram.android",version="Varies with device"} 21887135
appstores_ratings_1_total{store="gplay",country="gb",app="com.whatsapp",version="2.22.7.74"} 16107629

# HELP appstores_ratings_2_total App ratings with 2 stars since the launch of the app
# TYPE appstores_ratings_2_total gauge
appstores_ratings_2_total{store="itunes",country="us",app="net.whatsapp.WhatsApp",version="22.7.80"} 124294
appstores_ratings_2_total{store="itunes",country="us",app="com.burbn.instagram",version="228.0"} 191480
appstores_ratings_2_total{store="itunes",country="gb",app="net.whatsapp.WhatsApp",version="22.7.80"} 26797
appstores_ratings_2_total{store="gplay",country="us",app="com.whatsapp",version="2.22.7.74"} 4302408
appstores_ratings_2_total{store="gplay",country="us",app="com.instagram.android",version="Varies with device"} 3966737
appstores_ratings_2_total{store="gplay",country="gb",app="com.whatsapp",version="2.22.7.74"} 4142390

# HELP appstores_ratings_3_total App ratings with 3 stars since the launch of the app
# TYPE appstores_ratings_3_total gauge
appstores_ratings_3_total{store="itunes",country="us",app="net.whatsapp.WhatsApp",version="22.7.80"} 316454
appstores_ratings_3_total{store="itunes",country="us",app="com.burbn.instagram",version="228.0"} 553889
appstores_ratings_3_total{store="itunes",country="gb",app="net.whatsapp.WhatsApp",version="22.7.80"} 90520
appstores_ratings_3_total{store="gplay",country="us",app="com.whatsapp",version="2.22.7.74"} 7736141
appstores_ratings_3_total{store="gplay",country="us",app="com.instagram.android",version="Varies with device"} 6554452
appstores_ratings_3_total{store="gplay",country="gb",app="com.whatsapp",version="2.22.7.74"} 8522048

# HELP appstores_ratings_4_total App ratings with 4 stars since the launch of the app
# TYPE appstores_ratings_4_total gauge
appstores_ratings_4_total{store="itunes",country="us",app="net.whatsapp.WhatsApp",version="22.7.80"} 850007
appstores_ratings_4_total{store="itunes",country="us",app="com.burbn.instagram",version="228.0"} 1665557
appstores_ratings_4_total{store="itunes",country="gb",app="net.whatsapp.WhatsApp",version="22.7.80"} 268918
appstores_ratings_4_total{store="gplay",country="us",app="com.whatsapp",version="2.22.7.74"} 16329658
appstores_ratings_4_total{store="gplay",country="us",app="com.instagram.android",version="Varies with device"} 13900146
appstores_ratings_4_total{store="gplay",country="gb",app="com.whatsapp",version="2.22.7.74"} 19597512

# HELP appstores_ratings_5_total App ratings with 5 stars since the launch of the app
# TYPE appstores_ratings_5_total gauge
appstores_ratings_5_total{store="itunes",country="us",app="net.whatsapp.WhatsApp",version="22.7.80"} 8322495
appstores_ratings_5_total{store="itunes",country="us",app="com.burbn.instagram",version="228.0"} 19769547
appstores_ratings_5_total{store="itunes",country="gb",app="net.whatsapp.WhatsApp",version="22.7.80"} 2063471
appstores_ratings_5_total{store="gplay",country="us",app="com.whatsapp",version="2.22.7.74"} 114311571
appstores_ratings_5_total{store="gplay",country="us",app="com.instagram.android",version="Varies with device"} 87357625
appstores_ratings_5_total{store="gplay",country="gb",app="com.whatsapp",version="2.22.7.74"} 111280031

# HELP appstores_current_version_score_total App score for the current app version
# TYPE appstores_current_version_score_total gauge
appstores_current_version_score_total{store="itunes",country="us",app="net.whatsapp.WhatsApp",version="22.7.80"} 4.69536
appstores_current_version_score_total{store="itunes",country="us",app="com.burbn.instagram",version="228.0"} 4.74342
appstores_current_version_score_total{store="itunes",country="gb",app="net.whatsapp.WhatsApp",version="22.7.80"} 4.69854

# HELP appstores_current_version_reviews_total App reviews for the current app version
# TYPE appstores_current_version_reviews_total gauge
appstores_current_version_reviews_total{store="itunes",country="us",app="net.whatsapp.WhatsApp",version="22.7.80"} 9898794
appstores_current_version_reviews_total{store="itunes",country="us",app="com.burbn.instagram",version="228.0"} 22806478
appstores_current_version_reviews_total{store="itunes",country="gb",app="net.whatsapp.WhatsApp",version="22.7.80"} 2505037

# HELP appstores_min_active_installs App minimum active installs since the launch of the app
# TYPE appstores_min_active_installs gauge
appstores_min_active_installs{store="gplay",country="us",app="com.instagram.android",version="Varies with device"} 1000000000
appstores_min_active_installs{store="gplay",country="gb",app="com.whatsapp",version="2.22.7.74"} 5000000000
appstores_min_active_installs{store="gplay",country="us",app="com.whatsapp",version="2.22.7.74"} 5000000000

# HELP appstores_max_active_installs App maximum active installs since the launch of the app
# TYPE appstores_max_active_installs gauge
appstores_max_active_installs{store="gplay",country="us",app="com.instagram.android",version="Varies with device"} 4116093271
appstores_max_active_installs{store="gplay",country="gb",app="com.whatsapp",version="2.22.7.74"} 7025049556
appstores_max_active_installs{store="gplay",country="us",app="com.whatsapp",version="2.22.7.74"} 7025049556
```

## Requirements

* NodeJS >=16

## Installation

### Docker image

#### Default with demo apps

The simplest way to test this Prometheus exporter is by using Docker.

The command below will exports the metrics from the default apps from the `src/examples/apps.json`.

``` bash
mkdir ./config
cp -R ./src/examples/*.json ./config
```

``` bash
docker-compose up
```

Now, you can see the Prometheus metrics from your browser or command line at [http://localhost:9514/metrics][app-stores-prometheus-exporter-local]

``` bash
curl http://localhost:9514/metrics
```

#### Customize with yours apps

Now, try to test with your own app(s) by editing the config files.

Start by copy the files from the `src/examples` folder to the `config` folder (root of the project):

| From || To |
|---|---|---|
|`src/examples/apps.json`|=>|`config/apps.json`|
|`src/examples/config.json`|=>|`config/config.json`|

Add now your app IDs for iOS or/and Android on the `apps.json` file and activate the metrics you wants to export in the `config.json` file.

When it's done, restart the Docker container to see the changes:

``` bash
docker-compose down
docker-compose up
```

``` bash
curl http://localhost:9514/metrics
```

### NPM install

### From sources

``` bash
git clone git@github.com:timoa/app-stores-prometheus-exporter.git
cd app-stores-prometheus-exporter
npm install
```

Copy the configuration files

| From || To |
|---|---|---|
|`src/examples/apps.json`|=>|`config/apps.json`|
|`src/examples/config.json`|=>|`config/config.json`|

``` bash
mv ./src/examples/*.json ./config
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

## Tests

### API

You can launch the Docker container or node.js app and test the endpoints with Postman:

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/efda18b74fd7f4bc3034)

### NPM

#### Unit-tests

``` bash
npm test
```

#### Coverage

``` bash
npm run test:coverage
```

#### Functional

``` bash
npm run test:functional
```

#### All the tests

``` bash
npm run test:all
```

*Will be replace by `chai-http` soon.*

## Dashboards

The following Grafana dashboards are available in the Grafana Dashboards repository and can be install in your own Grafana instance (just copy the ID to import it):

* [Mobile App Stores - Per App][link-grafana-dashboard-per-app]
* [Mobile App Stores - Score][link-grafana-dashboard-score]
* [Mobile App Stores - Reviews][link-grafana-dashboard-reviews]
* [Mobile App Stores - Versions][link-grafana-dashboard-versions]

## TODO

* Improve test coverage
* Refactoring of the code to add more stores as plugins
* Simplify multiple countries configuration
* Add support to Mac App Store
* Add support to Microsoft Store
* Add support to Amazon Appstore
* Add other metrics from official App Store and Google Play API (downloads, active installations, etc.)

## Contributors

<!-- markdownlint-disable MD033 -->
<a href="https://github.com/timoa/app-stores-prometheus-exporter/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=timoa/app-stores-prometheus-exporter" />
</a>

Made with [contrib.rocks](https://contrib.rocks).

[sonarcloud]: https://sonarcloud.io/about
[github-badge]: https://github.com/timoa/app-stores-prometheus-exporter/workflows/Build/badge.svg
[github-url]: https://github.com/timoa/app-stores-prometheus-exporter/actions?query=workflow%3ABuild
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
[image-dashboard-app]: https://raw.githubusercontent.com/timoa/app-stores-prometheus-exporter/master/doc/images/grafana-app-stores-per-app-screen.jpg
[link-license]: https://raw.githubusercontent.com/timoa/app-stores-prometheus-exporter/master/LICENSE
[app-stores-prometheus-exporter-local]: http://localhost:9514/metrics
[link-google-play-scraper]: https://github.com/facundoolano/google-play-scraper
[link-app-store-scraper]: https://github.com/facundoolano/app-store-scraper
[link-grafana-dashboards]: https://grafana.com/orgs/timoa/dashboards
[link-grafana-dashboard-per-app]: https://grafana.com/grafana/dashboards/10100
[link-grafana-dashboard-score]: https://grafana.com/grafana/dashboards/10820
[link-grafana-dashboard-reviews]: https://grafana.com/grafana/dashboards/10821
[link-grafana-dashboard-versions]: https://grafana.com/grafana/dashboards/10822
