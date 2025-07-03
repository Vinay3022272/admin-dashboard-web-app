import React from 'react'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  return (
   <footer className='bg-blue-950 text-white flex justify-between px-4 h-16 items-center text-xs md:text-sm'>
    <p>
        About
A secure platform connecting fund seekers with verified funders.

Quick Links
About • How It Works • FAQs • Contact

Legal
Terms • Privacy • Compliance

Stay Updated
Get the latest funding news and updates.

© {currentYear} DashFund. All rights reserved.
    </p>
   </footer>
  )
}

export default Footer
