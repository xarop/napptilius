const visits = { total: 0, ips: new Set() }

export function visitsMiddleware(req, res, next) {
  // Only count SPA page loads, not API or asset requests
  const isPageLoad =
    req.method === 'GET' &&
    !req.path.startsWith('/api/') &&
    !req.path.match(/\.(js|css|png|jpg|webp|svg|ico|woff2?)$/)

  if (isPageLoad) {
    const ip = req.headers['x-forwarded-for']?.split(',')[0].trim() ?? req.socket.remoteAddress
    const isNew = !visits.ips.has(ip)
    visits.total++
    visits.ips.add(ip)
    console.log(`[visit] ${new Date().toISOString()} ip=${ip} path=${req.path} unique=${isNew} total=${visits.total}`)
  }

  next()
}

export function getVisits() {
  return { total: visits.total, unique: visits.ips.size }
}
