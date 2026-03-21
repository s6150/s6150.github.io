const proxyServer = 'SOCKS5 proxy.badhub.ru:8181; DIRECT';
const dnsCache = {};

const proxyDomains = [
  'bbc.com',
  'intel.com',
  'meduza.io'
];

const directTLDs = [
  '.local',
  '.ru',
  '.ru.com',
  '.ru.net',
  '.sbp',
  '.su',
  '.xn--p1ai' // .рф
];

const directDomains = [
  'yandex.com',
  'yandex.md',
  'yandex.net'
];

const directURLs = [
  '*.gosuslugi.ru'
];

const directIPs = [
  '77.88.8.8',
  '77.88.8.1'
];

function fastResolve(host) {
  let ip = dnsResolve(host);
  if (dnsCache[host]) return dnsCache[host];
  if (ip) dnsCache[host] = ip;
  return ip;
}

function FindProxyForURL(url, host) {
  url = url.toLowerCase();
  host = host.toLowerCase();
  let ip = fastResolve(host);

  if (isPlainHostName(host)) return 'DIRECT';

  if (isInNet(ip, '127.0.0.0', '255.0.0.0') ||
    isInNet(ip, '10.0.0.0', '255.0.0.0') ||
    isInNet(ip, '172.16.0.0', '255.240.0.0') ||
    isInNet(ip, '192.168.0.0', '255.255.0.0')) {
    return 'DIRECT';
  }

  for (let i = 0; i < proxyDomains.length; i++) {
    if (dnsDomainIs(host, proxyDomains[i])) return proxyServer;
  }

  for (let i = 0; i < directTLDs.length; i++) {
    if (dnsDomainIs(host, directTLDs[i])) return 'DIRECT';
  }

  for (let i = 0; i < directDomains.length; i++) {
    if (dnsDomainIs(host, directDomains[i])) return 'DIRECT';
  }

  for (let i = 0; i < directURLs.length; i++) {
    if (shExpMatch(host, directURLs[i])) return 'DIRECT';
  }

  for (let i = 0; i < directIPs.length; i++) {
    if (isInNet(ip, directIPs[i], '255.255.255.255')) return 'DIRECT';
  }

  return proxyServer;
}
