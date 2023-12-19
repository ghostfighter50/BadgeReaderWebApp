import React from 'react'

export const Navbar: React.FC = () => (
  <div>
    <nav className='navbar navbar-expand-lg navbar-dark '>
      <div className='container'>
        <a className='navbar-brand'>
          <h1>Badge Reader</h1>
        </a>
        <button className='navbar-toggler shadow-none border-0' type='button' data-bs-toggle='offcanvas' data-bs-target='#offcanvasNavbar' aria-controls='offcanvasNavbar' aria-label='Toggle navigation'>
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='sidebar offcanvas offcanvas-start ' id='offcanvasNavbar' aria-labelledby='offcanvasNavbarLabel'>
          <div className='offcanvas-header text-white border-bottom'>
            <h1 className='offcanvas-title ' id='offcanvasNavbarLabel'>
              Badge Reader
            </h1>
            <button type='button' className='btn-close btn-close-white shadow-none' data-bs-dismiss='offcanvas' aria-label='Close'></button>
          </div>
        </div>
      </div>
    </nav>
  </div>
)
