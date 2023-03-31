import React from 'react'
import CustomerSidebar from './CustomerSidebar'

function CustomerSettings() {
  return (
    <div>
        <CustomerSidebar />
        <div className="content md:ml-48 lg:ml-64 bg-[#f4f4f7] p-10">
            CustomerSettings
        </div>
    </div>
  )
}

export default CustomerSettings