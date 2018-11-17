# (WIP) app-stores-prometheus-exporter

This Prometheus exporter exports metrics (score, ratings, reviews, app version, etc.) from Apple App Store and Google Play

It's based on [google-play-scraper](https://github.com/facundoolano/google-play-scraper) and [app-store-scraper](https://github.com/facundoolano/app-store-scraper) to help getting the data from the app stores.

I'm looking to add more stores in the future (Microsoft Store, Amazon Appstore, etc.)

## Metrics supported by the exporter

For this early version, this Prometheus Exporter exports this data:

### iTunes

- Score from first version
- Total Number of Reviews
- Current Version Score
- Current Version number of Reviews

### Google Play

- Score from first version
- Total Number of Reviews
- Total Number of Ratings
- Total Number of Ratings with 1 star
- Total Number of Ratings with 2 stars
- Total Number of Ratings with 3 stars
- Total Number of Ratings with 4 stars
- Total Number of Ratings with 5 stars

## Metrics exposed to Prometheus

### Default collected metrics

- appstores_process_cpu_user_seconds_total
- appstores_process_cpu_system_seconds_total
- appstores_process_cpu_seconds_total
- appstores_process_start_time_seconds
- appstores_process_resident_memory_bytes
- appstores_nodejs_eventloop_lag_seconds
- appstores_nodejs_active_handles_total
- appstores_nodejs_active_requests_total
- appstores_nodejs_heap_size_total_bytes
- appstores_nodejs_heap_size_used_bytes
- appstores_nodejs_external_memory_bytes
- appstores_nodejs_heap_space_size_total_bytes{space="new"}
- appstores_nodejs_heap_space_size_total_bytes{space="old"}
- appstores_nodejs_heap_space_size_total_bytes{space="code"}
- appstores_nodejs_heap_space_size_total_bytes{space="map"}
- appstores_nodejs_heap_space_size_total_bytes{space="large_object"}
- appstores_nodejs_heap_space_size_used_bytes{space="new"}
- appstores_nodejs_heap_space_size_used_bytes{space="old"}
- appstores_nodejs_heap_space_size_used_bytes{space="code"}
- appstores_nodejs_heap_space_size_used_bytes{space="map"}
- appstores_nodejs_heap_space_size_used_bytes{space="large_object"}
- appstores_nodejs_heap_space_size_available_bytes{space="new"}
- appstores_nodejs_heap_space_size_available_bytes{space="old"}
- appstores_nodejs_heap_space_size_available_bytes{space="code"}
- appstores_nodejs_heap_space_size_available_bytes{space="map"}
- appstores_nodejs_heap_space_size_available_bytes{space="large_object"}
- appstores_nodejs_version_info{version="v8.12.0",major="8",minor="12",patch="0"}

### iTunes Store

- appstores_itunes_score_total{app="BUNDLEID",country="COUNTRY",version="VERSION"}
- appstores_itunes_reviews_total{app="BUNDLEID",country="COUNTRY",version="VERSION"}
- appstores_itunes_current_version_score_total{app="BUNDLEID",country="COUNTRY",version="VERSION"}
- appstores_itunes_current_version_reviews_total{app="BUNDLEID",country="COUNTRY",version="VERSION"}

### Google Play Store

- appstores_gplay_score_total{app="APPID",country="COUNTRY",version="VERSION"}
- appstores_gplay_reviews_total{app="APPID",country="COUNTRY",version="VERSION"}
- appstores_gplay_ratings_total{app="APPID",country="COUNTRY",version="VERSION"}
- appstores_gplay_ratings_1_total{app="APPID",country="COUNTRY",version="VERSION"}
- appstores_gplay_ratings_2_total{app="APPID",country="COUNTRY",version="VERSION"}
- appstores_gplay_ratings_3_total{app="APPID",country="COUNTRY",version="VERSION"}
- appstores_gplay_ratings_4_total{app="APPID",country="COUNTRY",version="VERSION"}
- appstores_gplay_ratings_5_total{app="APPID",country="COUNTRY",version="VERSION"}

## Metrics output example

``` text
# HELP appstores_process_cpu_user_seconds_total Total user CPU time spent in seconds.
# TYPE appstores_process_cpu_user_seconds_total counter
appstores_process_cpu_user_seconds_total 0.001612 1542442919444

# HELP appstores_process_cpu_system_seconds_total Total system CPU time spent in seconds.
# TYPE appstores_process_cpu_system_seconds_total counter
appstores_process_cpu_system_seconds_total 0.000041 1542442919444

# HELP appstores_process_cpu_seconds_total Total user and system CPU time spent in seconds.
# TYPE appstores_process_cpu_seconds_total counter
appstores_process_cpu_seconds_total 0.001653 1542442919444

# HELP appstores_process_start_time_seconds Start time of the process since unix epoch in seconds.
# TYPE appstores_process_start_time_seconds gauge
appstores_process_start_time_seconds 1542442919

# HELP appstores_process_resident_memory_bytes Resident memory size in bytes.
# TYPE appstores_process_resident_memory_bytes gauge
appstores_process_resident_memory_bytes 47874048 1542442919444

# HELP appstores_nodejs_eventloop_lag_seconds Lag of event loop in seconds.
# TYPE appstores_nodejs_eventloop_lag_seconds gauge
appstores_nodejs_eventloop_lag_seconds 0.020853333 1542442919465

# HELP appstores_nodejs_active_handles_total Number of active handles.
# TYPE appstores_nodejs_active_handles_total gauge
appstores_nodejs_active_handles_total 2 1542442919445

# HELP appstores_nodejs_active_requests_total Number of active requests.
# TYPE appstores_nodejs_active_requests_total gauge
appstores_nodejs_active_requests_total 0 1542442919445

# HELP appstores_nodejs_heap_size_total_bytes Process heap size from node.js in bytes.
# TYPE appstores_nodejs_heap_size_total_bytes gauge
appstores_nodejs_heap_size_total_bytes 35737600 1542442919445

# HELP appstores_nodejs_heap_size_used_bytes Process heap size used from node.js in bytes.
# TYPE appstores_nodejs_heap_size_used_bytes gauge
appstores_nodejs_heap_size_used_bytes 20239296 1542442919445

# HELP appstores_nodejs_external_memory_bytes Nodejs external memory size in bytes.
# TYPE appstores_nodejs_external_memory_bytes gauge
appstores_nodejs_external_memory_bytes 682481 1542442919445

# HELP appstores_nodejs_heap_space_size_total_bytes Process heap space size total from node.js in bytes.
# TYPE appstores_nodejs_heap_space_size_total_bytes gauge
appstores_nodejs_heap_space_size_total_bytes{space="new"} 16777216 1542442919445
appstores_nodejs_heap_space_size_total_bytes{space="old"} 11882496 1542442919445
appstores_nodejs_heap_space_size_total_bytes{space="code"} 2097152 1542442919445
appstores_nodejs_heap_space_size_total_bytes{space="map"} 1069056 1542442919445
appstores_nodejs_heap_space_size_total_bytes{space="large_object"} 3911680 1542442919445

# HELP appstores_nodejs_heap_space_size_used_bytes Process heap space size used from node.js in bytes.
# TYPE appstores_nodejs_heap_space_size_used_bytes gauge
appstores_nodejs_heap_space_size_used_bytes{space="new"} 2751600 1542442919445
appstores_nodejs_heap_space_size_used_bytes{space="old"} 11568840 1542442919445
appstores_nodejs_heap_space_size_used_bytes{space="code"} 1274560 1542442919445
appstores_nodejs_heap_space_size_used_bytes{space="map"} 791032 1542442919445
appstores_nodejs_heap_space_size_used_bytes{space="large_object"} 3858896 1542442919445

# HELP appstores_nodejs_heap_space_size_available_bytes Process heap space size available from node.js in bytes.
# TYPE appstores_nodejs_heap_space_size_available_bytes gauge
appstores_nodejs_heap_space_size_available_bytes{space="new"} 5497744 1542442919445
appstores_nodejs_heap_space_size_available_bytes{space="old"} 336 1542442919445
appstores_nodejs_heap_space_size_available_bytes{space="code"} 0 1542442919445
appstores_nodejs_heap_space_size_available_bytes{space="map"} 80 1542442919445
appstores_nodejs_heap_space_size_available_bytes{space="large_object"} 1463717376 1542442919445

# HELP appstores_nodejs_version_info Node.js version info.
# TYPE appstores_nodejs_version_info gauge
appstores_nodejs_version_info{version="v8.9.4",major="8",minor="9",patch="4"} 1

# HELP appstores_itunes_score_total Itunes app score since the launch of the app
# TYPE appstores_itunes_score_total gauge
appstores_itunes_score_total{app="net.whatsapp.WhatsApp",country="us",version="2.18.102"} 4.5
appstores_itunes_score_total{app="com.burbn.instagram",country="us",version="71.0"} 5
appstores_itunes_score_total{app="net.whatsapp.WhatsApp",country="gb",version="2.18.102"} 4.5

# HELP appstores_itunes_reviews_total iTunes app reviews since the launch of the app
# TYPE appstores_itunes_reviews_total gauge
appstores_itunes_reviews_total{app="net.whatsapp.WhatsApp",country="us",version="2.18.102"} 3983037
appstores_itunes_reviews_total{app="com.burbn.instagram",country="us",version="71.0"} 13905276
appstores_itunes_reviews_total{app="net.whatsapp.WhatsApp",country="gb",version="2.18.102"} 1255459

# HELP appstores_itunes_current_version_score_total iTunes app score for the current app version
# TYPE appstores_itunes_current_version_score_total gauge
appstores_itunes_current_version_score_total{app="net.whatsapp.WhatsApp",country="us",version="2.18.102"} 4.5
appstores_itunes_current_version_score_total{app="com.burbn.instagram",country="us",version="71.0"} 5
appstores_itunes_current_version_score_total{app="net.whatsapp.WhatsApp",country="gb",version="2.18.102"} 4.5

# HELP appstores_itunes_current_version_reviews_total iTunes app reviews for the current app version
# TYPE appstores_itunes_current_version_reviews_total gauge
appstores_itunes_current_version_reviews_total{app="net.whatsapp.WhatsApp",country="us",version="2.18.102"} 27318
appstores_itunes_current_version_reviews_total{app="com.burbn.instagram",country="us",version="71.0"} 84873
appstores_itunes_current_version_reviews_total{app="net.whatsapp.WhatsApp",country="gb",version="2.18.102"} 7782

# HELP appstores_gplay_score_total Google Play app score since the launch of the app
# TYPE appstores_gplay_score_total gauge
appstores_gplay_score_total{app="com.whatsapp",country="gb",version="Varies with device"} 4.413833
appstores_gplay_score_total{app="com.instagram.android",country="us",version="Varies with device"} 4.5177283
appstores_gplay_score_total{app="com.whatsapp",country="us",version="Varies with device"} 4.413828

# HELP appstores_gplay_reviews_total Google Play app reviews since the launch of the app
# TYPE appstores_gplay_reviews_total gauge
appstores_gplay_reviews_total{app="com.whatsapp",country="gb",version="Varies with device"} 19664740
appstores_gplay_reviews_total{app="com.instagram.android",country="us",version="Varies with device"} 22018852
appstores_gplay_reviews_total{app="com.whatsapp",country="us",version="Varies with device"} 19664091

# HELP appstores_gplay_ratings_total Google Play app ratings since the launch of the app
# TYPE appstores_gplay_ratings_total gauge
appstores_gplay_ratings_total{app="com.whatsapp",country="gb",version="Varies with device"} 77837401
appstores_gplay_ratings_total{app="com.instagram.android",country="us",version="Varies with device"} 72304986
appstores_gplay_ratings_total{app="com.whatsapp",country="us",version="Varies with device"} 77834540

# HELP appstores_gplay_ratings_1_total Google Play app ratings with 1 star since the launch of the app
# TYPE appstores_gplay_ratings_1_total gauge
appstores_gplay_ratings_1_total{app="com.whatsapp",country="gb",version="Varies with device"} 4695182
appstores_gplay_ratings_1_total{app="com.instagram.android",country="us",version="Varies with device"} 2889061
appstores_gplay_ratings_1_total{app="com.whatsapp",country="us",version="Varies with device"} 4695076

# HELP appstores_gplay_ratings_2_total Google Play app ratings with 2 stars since the launch of the app
# TYPE appstores_gplay_ratings_2_total gauge
appstores_gplay_ratings_2_total{app="com.whatsapp",country="gb",version="Varies with device"} 1911102
appstores_gplay_ratings_2_total{app="com.instagram.android",country="us",version="Varies with device"} 1320654
appstores_gplay_ratings_2_total{app="com.whatsapp",country="us",version="Varies with device"} 1911050

# HELP appstores_gplay_ratings_3_total Google Play app ratings with 3 stars since the launch of the app
# TYPE appstores_gplay_ratings_3_total gauge
appstores_gplay_ratings_3_total{app="com.whatsapp",country="gb",version="Varies with device"} 4932056
appstores_gplay_ratings_3_total{app="com.instagram.android",country="us",version="Varies with device"} 3924559
appstores_gplay_ratings_3_total{app="com.whatsapp",country="us",version="Varies with device"} 4931901

# HELP appstores_gplay_ratings_4_total Google Play app ratings with 4 stars since the launch of the app
# TYPE appstores_gplay_ratings_4_total gauge
appstores_gplay_ratings_4_total{app="com.whatsapp",country="gb",version="Varies with device"} 11247573
appstores_gplay_ratings_4_total{app="com.instagram.android",country="us",version="Varies with device"} 11503337
appstores_gplay_ratings_4_total{app="com.whatsapp",country="us",version="Varies with device"} 11247176

# HELP appstores_gplay_ratings_5_total Google Play app ratings with 5 stars since the launch of the app
# TYPE appstores_gplay_ratings_5_total gauge
appstores_gplay_ratings_5_total{app="com.whatsapp",country="gb",version="Varies with device"} 55051488
appstores_gplay_ratings_5_total{app="com.instagram.android",country="us",version="Varies with device"} 52667375
appstores_gplay_ratings_5_total{app="com.whatsapp",country="us",version="Varies with device"} 55049337
```

## Requirements

- NodeJS >=8

## Installation

### NPM install

### Docker image

### From sources

``` bash
git clone git@github.com:timoa/app-stores-prometheus-exporter.git
cd app-stores-prometheus-exporter
npm install
npm start
```

``` bash
Prometheus App Stores Exporter is listening on http://localhost:9514
```

## TODO

- Protect memory leak from the external scrapers when app doesn't exist under a country
- Better error handling
- Better test coverage
- Refactoring of the code to add more stores as plugins
- Simplify multiple countries configuration
- Add support to Mac App Store
- Add support to Microsoft Store
- Add support to Amazon Appstore