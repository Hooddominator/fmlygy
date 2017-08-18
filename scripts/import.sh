#!/bin/bash
# import subtitles into elasticsearch

ES_HOST="127.0.0.1:9200"
ES_INDEX="familyguy"
ES_URL="${ES_HOST}/${ES_INDEX}"

# delete old index, create new index
curl -s -XDELETE ${ES_URL}
curl -s -XPUT ${ES_URL} -d @../data/mapping.json
curl -s -H "Content-Type: application/x-ndjson" -XPOST "${ES_URL}/_bulk" --data-binary @../data/episodes.bulk