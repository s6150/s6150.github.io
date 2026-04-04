## PROXY

### HTTP

```
https://badhub.ru/proxy.http.pac
```

### SOCKS5

```
https://badhub.ru/proxy.socks.pac
```

### XRay

- Routing:

```
[{"remarks":"Local IP","enabled":true,"locked":false,"ip":["geoip:private"],"outboundTag":"direct"},{"remarks":"Local Domain","enabled":true,"locked":false,"domain":["geosite:private"],"outboundTag":"direct"},{"remarks":"BitTorrent","enabled":true,"locked":false,"protocol":["bittorrent"],"outboundTag":"direct"},{"remarks":"UDP-443","enabled":true,"locked":false,"port":"443","network":"udp","outboundTag":"block"},{"remarks":"Ads","enabled":true,"locked":false,"domain":["geosite:category-ads-all"],"outboundTag":"block"},{"remarks":"Russian IP","enabled":true,"locked":false,"ip":["geoip:ru"],"outboundTag":"direct"},{"remarks":"Russian Domain","enabled":true,"locked":false,"domain":["geosite:category-ru"],"outboundTag":"direct"},{"remarks":"Russian Domain (EXT)","enabled":true,"locked":false,"domain":["regexp:.*\\.am$","regexp:.*\\.az$","regexp:.*\\.by$","regexp:.*\\.kg$","regexp:.*\\.kz$","regexp:.*\\.md$","regexp:.*\\.mn$","regexp:.*\\.ru$","regexp:.*\\.su$","regexp:.*\\.tatar$","regexp:.*\\.tj$","regexp:.*\\.tm$","regexp:.*\\.uz$","regexp:.*\\.xn--p1ai"],"outboundTag":"direct"}]
```

## Contacts

- [mail@kaikim.ru](mailto:mail@kaikim.ru)

## Links

- [Kai Kimera](https://kaikim.ru/ru/about/)
- [libSYS](https://libsys.ru/ru/about/)
