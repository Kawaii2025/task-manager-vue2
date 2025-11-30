export default {
  methods: {
    formatDate(date) {
      const d = new Date(date)
      return d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    },
    
    timeAgo(date) {
      const seconds = Math.floor((new Date() - new Date(date)) / 1000)
      
      let interval = seconds / 31536000
      if (interval > 1) return Math.floor(interval) + ' years ago'
      
      interval = seconds / 2592000
      if (interval > 1) return Math.floor(interval) + ' months ago'
      
      interval = seconds / 86400
      if (interval > 1) return Math.floor(interval) + ' days ago'
      
      return 'Recently'
    }
  }
}
