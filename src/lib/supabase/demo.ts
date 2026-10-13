import {
  DEMO_USER,
  MOCK_PROFILES,
  MOCK_GALLERY_CATEGORIES,
  MOCK_GALLERY_IMAGES,
  MOCK_BLOG_CATEGORIES,
  MOCK_BLOGS,
  MOCK_BANNERS,
  MOCK_ADMISSION_ENQUIRIES,
  MOCK_CONTACT_MESSAGES,
  MOCK_TC_DOCUMENTS,
  MOCK_PAGES,
  MOCK_SETTINGS,
  MOCK_MEDIA,
  MOCK_AUDIT_LOGS,
} from './mock-data'

function getMockTableData(table: string): any[] {
  switch (table) {
    case 'profiles':
      return MOCK_PROFILES
    case 'gallery_categories':
      return MOCK_GALLERY_CATEGORIES
    case 'gallery_images':
      return MOCK_GALLERY_IMAGES
    case 'blog_categories':
      return MOCK_BLOG_CATEGORIES
    case 'blogs':
      return MOCK_BLOGS
    case 'homepage_banners':
      return MOCK_BANNERS
    case 'admission_enquiries':
      return MOCK_ADMISSION_ENQUIRIES
    case 'contact_messages':
      return MOCK_CONTACT_MESSAGES
    case 'tc_documents':
      return MOCK_TC_DOCUMENTS
    case 'school_pages':
      return MOCK_PAGES
    case 'website_settings':
      return MOCK_SETTINGS
    case 'media_library':
      return MOCK_MEDIA
    case 'audit_logs':
      return MOCK_AUDIT_LOGS
    default:
      return []
  }
}

export function createDemoClient(): any {
  return {
    auth: {
      async getUser() {
        return { data: { user: DEMO_USER }, error: null }
      },
      async getSession() {
        return { data: { session: { user: DEMO_USER } }, error: null }
      },
      async signInWithPassword() {
        return { data: { user: DEMO_USER }, error: null }
      },
      async signOut() {
        return { error: null }
      },
      async resetPasswordForEmail() {
        return { data: {}, error: null }
      },
      async updateUser() {
        return { data: { user: DEMO_USER }, error: null }
      },
      onAuthStateChange(callback: Function) {
        callback('SIGNED_IN', { user: DEMO_USER })
        return { data: { subscription: { unsubscribe: () => {} } } }
      },
    },
    channel(name: string) {
      const channelObj: any = {
        on(event: string, filter: any, callback: Function) {
          return channelObj
        },
        subscribe(callback?: Function) {
          if (callback) setTimeout(() => callback('SUBSCRIBED'), 10)
          return channelObj
        },
      }
      return channelObj
    },
    removeChannel(ch: any) {
      return Promise.resolve()
    },
    from(tableName: string) {
      let currentData = [...getMockTableData(tableName)]
      let isSingle = false
      let isCountHead = false

      const builder: any = {
        select(query?: string, options?: { count?: string; head?: boolean }) {
          if (options?.head) {
            isCountHead = true
          }
          return builder
        },
        eq(column: string, value: any) {
          currentData = currentData.filter(item => item[column] === value)
          return builder
        },
        order(column: string, options?: { ascending?: boolean }) {
          return builder
        },
        limit(n: number) {
          currentData = currentData.slice(0, n)
          return builder
        },
        range(from: number, to: number) {
          currentData = currentData.slice(from, to + 1)
          return builder
        },
        single() {
          isSingle = true
          return builder
        },
        maybeSingle() {
          isSingle = true
          return builder
        },
        insert(items: any) {
          const arr = Array.isArray(items) ? items : [items]
          currentData = arr.map((item, idx) => ({
            id: item.id || `demo-${Date.now()}-${idx}`,
            created_at: new Date().toISOString(),
            ...item,
          }))
          return builder
        },
        update(values: any) {
          currentData = currentData.map(item => ({ ...item, ...values }))
          return builder
        },
        upsert(values: any) {
          const arr = Array.isArray(values) ? values : [values]
          currentData = [...arr, ...currentData]
          return builder
        },
        delete() {
          return builder
        },
        then(resolve: Function, reject?: Function) {
          const result = {
            data: isCountHead ? null : isSingle ? (currentData[0] || null) : currentData,
            count: currentData.length,
            error: null,
          }
          return Promise.resolve(result).then(resolve as any, reject as any)
        },
      }

      return builder
    },
  }
}
