// import React from 'react';
// import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';

// export default function Footer() {
//   return (
// <MDBFooter style={{ backgroundColor: '#2c3e50', color: '#ecf0f1' }} className='text-center text-lg-start'>
// <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
//         <div className='me-5 d-none d-lg-block'>
//           <span>Get connected with us on social networks:</span>
//         </div>

//         <div>
//           <a href='' className='me-4 text-reset'>
//             <MDBIcon color='secondary' fab icon='facebook-f' />
//           </a>
//           <a href='' className='me-4 text-reset'>
//             <MDBIcon color='secondary' fab icon='twitter' />
//           </a>
//           <a href='' className='me-4 text-reset'>
//             <MDBIcon color='secondary' fab icon='google' />
//           </a>
//           <a href='' className='me-4 text-reset'>
//             <MDBIcon color='secondary' fab icon='instagram' />
//           </a>
//           <a href='' className='me-4 text-reset'>
//             <MDBIcon color='secondary' fab icon='linkedin' />
//           </a>
//           <a href='' className='me-4 text-reset'>
//             <MDBIcon color='secondary' fab icon='github' />
//           </a>
//         </div>
//       </section>

//       <section className=''>
//         <MDBContainer className='text-center text-md-start mt-5'>
//           <MDBRow className='mt-3'>
//             <MDBCol md='3' lg='4' xl='3' className='mx-auto mb-4'>
//               <h6 className='text-uppercase fw-bold mb-4'>
//                 <MDBIcon color='secondary' icon='gem' className='me-3' />
//                 Company name
//               </h6>
//               <p>
//                 Here you can use rows and columns to organize your footer content. Lorem ipsum dolor sit
//                 amet, consectetur adipisicing elit.
//               </p>
//             </MDBCol>

//             <MDBCol md='2' lg='2' xl='2' className='mx-auto mb-4'>
//               <h6 className='text-uppercase fw-bold mb-4'>Products</h6>
//               <p>
//                 <a href='#!' className='text-reset'>
//                   Angular
//                 </a>
//               </p>
//               <p>
//                 <a href='#!' className='text-reset'>
//                   React
//                 </a>
//               </p>
//               <p>
//                 <a href='#!' className='text-reset'>
//                   Vue
//                 </a>
//               </p>
//               <p>
//                 <a href='#!' className='text-reset'>
//                   Laravel
//                 </a>
//               </p>
//             </MDBCol>

//             <MDBCol md='3' lg='2' xl='2' className='mx-auto mb-4'>
//               <h6 className='text-uppercase fw-bold mb-4'>Useful links</h6>
//               <p>
//                 <a href='#!' className='text-reset'>
//                   Pricing
//                 </a>
//               </p>
//               <p>
//                 <a href='#!' className='text-reset'>
//                   Settings
//                 </a>
//               </p>
//               <p>
//                 <a href='#!' className='text-reset'>
//                   Orders
//                 </a>
//               </p>
//               <p>
//                 <a href='#!' className='text-reset'>
//                   Help
//                 </a>
//               </p>
//             </MDBCol>

//             <MDBCol md='4' lg='3' xl='3' className='mx-auto mb-md-0 mb-4'>
//               <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
//               <p>
//                 <MDBIcon color='secondary' icon='home' className='me-2' />
//                 New York, NY 10012, US
//               </p>
//               <p>
//                 <MDBIcon color='secondary' icon='envelope' className='me-3' />
//                 info@example.com
//               </p>
//               <p>
//                 <MDBIcon color='secondary' icon='phone' className='me-3' /> + 01 234 567 88
//               </p>
//               <p>
//                 <MDBIcon color='secondary' icon='print' className='me-3' /> + 01 234 567 89
//               </p>
//             </MDBCol>
//           </MDBRow>
//         </MDBContainer>
//       </section>

//       <div className='text-center p-4' style={{ backgroundColor: 'rgba(236, 240, 241, 0.1)', color: '#ecf0f1' }}>
//       © 2021 Copyright:
//         <a className='text-reset fw-bold' href='https://mdbootstrap.com/'>
//          SoulSync AI
//         </a>
//       </div>
//     </MDBFooter>
//   );
// }



// Footer.jsx
import { Mail, Instagram, Twitter, Linkedin } from "lucide-react";
import logo from "../assets/SoulSync Logo.png"; // Adjust path as needed
import "../styles/Footer.css"; // Adjust path as needed
export default function Footer() {
  return (
    <footer className="soulsync-footer">
      <div className="footer-container">
        <div className="footer-brand">
          <img src={logo} alt="SoulSync AI Logo" className="footer-logo" />
          <span className="footer-title">SoulSync AI</span>
          <p className="footer-tagline">
            Your silent companion for emotional healing and mental clarity.
          </p>
        </div>
        <div className="footer-links">
          <div>
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#features">Features</a></li>
              <li><a href="#how-it-works">How it Works</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="/Chatbot">Chat Now</a></li>
            </ul>
          </div>
          <div>
            <h4>Resources</h4>
            <ul>
              <li><a href="#">Blog</a></li>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Support</a></li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>
              <li>
                <Mail size={18} style={{ verticalAlign: "middle" }} />{" "}
                <a href="mailto:hello@soulsync.ai">hello@soulsync.ai</a>
              </li>
              <li className="footer-socials">
                <a href="https://twitter.com/" aria-label="Twitter"><Twitter size={18} /></a>
                <a href="https://instagram.com/" aria-label="Instagram"><Instagram size={18} /></a>
                <a href="https://linkedin.com/" aria-label="LinkedIn"><Linkedin size={18} /></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} SoulSync AI. All rights reserved.</span>
        <span>
          <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a>
        </span>
      </div>
    </footer>
  );
}
