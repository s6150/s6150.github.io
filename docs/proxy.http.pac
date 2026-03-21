let dnsCache = {};

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
  if (shExpMatch(host, '*.local')) return 'DIRECT';

  if (isInNet(ip, '127.0.0.0', '255.0.0.0') ||
    isInNet(ip, '10.0.0.0', '255.0.0.0') ||
    isInNet(ip, '172.16.0.0', '255.240.0.0') ||
    isInNet(ip, '192.168.0.0', '255.255.0.0')) {
    return 'DIRECT';
  }

  return 'PROXY proxy.badhub.ru:8181; DIRECT';
}
