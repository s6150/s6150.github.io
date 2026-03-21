const $proxyServer = 'SOCKS5 proxy.badhub.ru:8181; DIRECT';
const $dnsCache = {};
const $proxyDomain = 0;
const $proxyUrl = 0;

const $proxyDomainStorage = [
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

const $proxyUrlStorage = [
  '*ggpht*',
  '*googlevideo*',
  '*gstatic*',
  '*nnmstatic*',
  '*ytimg*',
];

const $localTldStorage = [
  '.home.arpa',
  '.local',
  '.localdomain',
];

const $directTldStorage = [
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

const $directDomainStorage = [
  'vk.com',
  'yandex.com',
  'yandex.net',
];

const $directUrlStorage = [
  '*.gosuslugi.ru*',
];

const $directIpStorage = [
  '77.88.8.8',
  '77.88.8.1',
];

function fastResolve($host) {
  let $ip = dnsResolve($host);
  if ($dnsCache[$host]) return $dnsCache[$host];
  if ($ip) $dnsCache[$host] = $ip;
  return $ip;
}

function FindProxyForURL($url, $host) {
  $url = $url.toLowerCase();
  $host = $host.toLowerCase();
  let $ip = fastResolve($host);

  if (isPlainHostName($host)) return 'DIRECT';

  if (
    isInNet($ip, '127.0.0.0', '255.0.0.0') ||
    isInNet($ip, '10.0.0.0', '255.0.0.0') ||
    isInNet($ip, '172.16.0.0', '255.240.0.0') ||
    isInNet($ip, '192.168.0.0', '255.255.0.0')
  ) {
    return 'DIRECT';
  }

  for (let $i = 0; $i < $localTldStorage.length; $i++) {
    if (dnsDomainIs($host, $localTldStorage[$i])) return 'DIRECT';
  }

  for (let $i = 0; $i < $directTldStorage.length; $i++) {
    if (dnsDomainIs($host, $directTldStorage[$i])) return 'DIRECT';
  }

  for (let $i = 0; $i < $directDomainStorage.length; $i++) {
    if (dnsDomainIs($host, $directDomainStorage[$i])) return 'DIRECT';
  }

  for (let $i = 0; $i < $directUrlStorage.length; $i++) {
    if (shExpMatch($host, $directUrlStorage[$i])) return 'DIRECT';
  }

  for (let $i = 0; $i < $directIpStorage.length; $i++) {
    if (isInNet($ip, $directIpStorage[$i], '255.255.255.255')) return 'DIRECT';
  }

  if ((!$proxyDomain && $proxyDomainStorage.length === 0) || (!$proxyUrl && $proxyUrlStorage.length === 0)) {
    return $proxyServer;
  } else {
    for (let $i = 0; $i < $proxyDomainStorage.length; $i++) {
      if (dnsDomainIs($host, $proxyDomainStorage[$i])) return $proxyServer;
    }

    for (let $i = 0; $i < $proxyUrlStorage.length; $i++) {
      if (shExpMatch($host, $proxyUrlStorage[$i])) return $proxyServer;
    }
  }
}
