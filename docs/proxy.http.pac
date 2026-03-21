const proxyServer = 'HTTP proxy.badhub.ru:8080; DIRECT';
const dnsCache = {};

const proxyDomains = [
  'cloudflare.com',
  'deviantart.com',
  'facebook.com',
  'instagram.com',
  'nnmclub.to',
  'pixiv.com',
  'twitter.com',
  'wixmp.com',
  'x.com',
  'youtube.com',
];

const proxyURLs = [
  '*ggpht*',
  '*googlevideo*',
  '*gstatic*',
  '*nnmstatic*',
  '*ytimg*',
];

const localTLDs = [
  '.home.arpa',
  '.local',
  '.localdomain',
];

const directTLDs = [
  '.am',
  '.az',
  '.by',
  '.kg',
  '.kz',
  '.md',
  '.mn',
  '.ru',
  '.su',
  '.tatar',
  '.tj',
  '.tm',
  '.uz',
  '.xn--p1ai', // .рф
];

const directDomains = [
  'vk.com',
  'yandex.com',
  'yandex.net',
];

const directURLs = [
  '*.gosuslugi.ru*',
];

const directIPs = [
  '77.88.8.8',
  '77.88.8.1',
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

  for (let i = 0; i < localTLDs.length; i++) {
    if (dnsDomainIs(host, localTLDs[i])) return 'DIRECT';
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

  if (proxyDomains.length === 0 || proxyURLs.length === 0) {
    return proxyServer;
  } else {
    for (let i = 0; i < proxyDomains.length; i++) {
      if (dnsDomainIs(host, proxyDomains[i])) return proxyServer;
    }

    for (let i = 0; i < proxyURLs.length; i++) {
      if (shExpMatch(host, proxyURLs[i])) return proxyServer;
    }
  }
}
