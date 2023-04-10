import React from 'react'

import { Typography, Card, Space } from 'antd'
const { Link } = Typography

const notes = [
  {
    title: 'GitHub',
    href: 'https://github.com/nodejavascript/sudoku-ml',
    linkText: 'Readme'
  },
  {
    title: 'Attribution',
    href: 'https://www.flaticon.com/free-icons/sudoku',
    linkText: 'Thank you Sudoku icons created by Darius Dan - Flaticon 👍'
  },
  {
    title: 'Created by',
    href: 'https://github.com/nodejavascript',
    linkText: '@nodejavascript'
  }
]

const SiteFooter = () => {
  return (
    <Space wrap>
      {
        notes.map((note, index) => {
          const { title, href, linkText } = note

          return (
            <Card key={`footerNote${index}`} title={title}>
              <Link href={href}>
                {linkText}
              </Link>
            </Card>
          )
        })
      }
    </Space>
  )
}

export default SiteFooter
