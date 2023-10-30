import React from 'react'

const Footer = () => {
  return (
    <footer>
        <div className="w-9/12 mx-auto sm:px-16 py-16 text-zinc-400 font-semibold sm:text-md text-sm cursor-pointer">
          <div>
            <h5 className="underline">Questions? Contact us.</h5>
            <br />
            <ul className="flex flex-row flex-wrap gap-4 text-left justify-between underline">
              <div className="flex-1">
                <li>FAQ</li>
                <li>Investor Relations</li>
                <li>Ways to Watch</li>
                <li>Corporate Information</li>
                <li>Legal Notices</li>
              </div>
              {/*  */}
              <div className="flex-1">
                <li>Help Center</li>
                <li>Jobs</li>
                <li>Terms of Use</li>
                <li>Contact Us</li>
                <li>Only on Netflix</li>
              </div>
              {/*  */}
              <div className="flex-1">
                <li>Account</li>
                <li>Redeem Gift Cards</li>
                <li>Privacy</li>
                <li>Speed Test</li>
                <li>Ad Choices</li>
              </div>
              {/*  */}
              <div className="flex-1">
                <li>Media Center</li>
                <li>Buy Gift Cards</li>
                <li>Cookie Preferences</li>
                <li>Legal Guarantee</li>
              </div>
            </ul>
            <br />
            <h5 className="cursor-auto">Netflix Czechia</h5>
          </div>
        </div>
        <h1 className="w-full text-center">Made by Ondřej Zahradník❤️</h1>
      </footer>
  )
}

export default Footer