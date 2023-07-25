import BLOG from '@/blog.config'

/**
* 订阅邮件-服务端接口
* @param {*} email
* @returns
*/
export default function subscribeToMailchimpApi({ email, first_name = '', last_name = '' }) {
  const listId = c3dc823061 // 替换为你的邮件列表 ID
  const apiKey = bafa84d32fca9b54fbe1ab3c2504c90b // 替换为你的 API KEY
  if (!email || !listId || !apiKey) {
    return {}
  }
  const data = {
    email_address: email,
    status: 'subscribed',
    merge_fields: {
      FNAME: first_name,
      LNAME: last_name
    }
  }
  return fetch(`https://us18.api.mailchimp.com/3.0/lists/${listId}/members`, {
    method: 'POST',
    headers: {
      Authorization: `apikey ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
}

/**
 * 客户端接口
 * @param {*} email
 * @param {*} firstName
 * @param {*} lastName
 * @returns
 */
export async function subscribeToNewsletter(email, firstName, lastName) {
  const response = await fetch('/api/subscribe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, first_name: firstName, last_name: lastName })
  })
  const data = await response.json()
  return data
}
