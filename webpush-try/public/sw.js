self.addEventListener('push', (e) => {
  const { title, body, url } = e.data.json()
  e.waitUntil(self.registration.showNotification(title, { body, data: url }))
})

self.addEventListener('notificationclick', (e) => {
  e.notification.close()
  e.waitUntil(clients.openWindow(e.notification.data))
})
