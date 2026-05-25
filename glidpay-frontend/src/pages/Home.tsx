import "../style/Home.css"
import "../style/features.css";
import "../style/security.css";
import "../style/How-it-works.css";
import { FaUserPlus, FaWallet, FaPaperPlane } from "react-icons/fa";
import { motion } from "framer-motion";
function HomePage(){

    //Variants 
    const containerVariants = {
        hidden: {},
        visible: {
            transition:{
                staggerChildren: 0.2
            }
        }
    }

    const cardVariants = {
        hidden:{
            opacity: 0,
            y: 60
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    }
    return(
        <>
<section id="home"> 

     <div className="Features-header">
        <h1>GLIDPAY</h1>
        <div className="Features-header-copy">
            <p>Powerful Financial Features built for the Modern World</p>
            <p>GlidPay gives you a fast, secure, and simple way<br />to send, receive, store, and manage money globally<br />anytime and anywhere</p>
            <span>-Get STARTED | Download App</span>
        </div>
    </div></section>
        
<section id="features">
    <div className="features">
        <div className="feature-head">
            <div className="line"></div>
            <h3>feature</h3>
        </div>
     <div className="feature-Head">
                <h2>How it works</h2>
                <p> A Guided way for geting you started<br /> from zero to transacting in less <br /> than 2 minutes</p>
                <div className="line5"></div>
                <p>We made it stupid simple <br /><code> Sign-UP. Fund-UP. Move money</code> </p>
                <img src="/images/magazine.jpg" alt="wallet"></img>
            </div>


        <motion.div className="features-cards"  variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2}}>
            <div className="feature">
                <h2>Global Feature</h2>
                <p>Send and receive money instantly across countries,<br /> with fast processing and real-time transaction update</p>
                <pre>Real-time transfer</pre>
                <pre>Fast confirmation</pre>
                <pre>24/7 transaction</pre>
            </div>

            <div className="feature">
                <h2>Multi-Currency Wallet</h2>
                <p>Store and manage multple currencies in one secure<br/> wallet without needing multiple bank accounts</p>
                <pre>Multiple currencies</pre>
                <pre>Easy conversion</pre>
                <pre>Global accessibility</pre>
            </div>

            <div className="feature">
                <h2>Advanced Security</h2>
                <p>Protect your funds using encrypted systems, <br /> secret key verification, and advance account security</p>
                <pre>Encrypted Transaction</pre>
                <pre>Secret Key Verification</pre>
                <pre>Account Security</pre>
            </div>

            <div className="feature">
                <h2>Mobile Banking</h2>
                <p>Access your Wallet anytime through a smooth and secure mobile first experience</p>
                <pre>Mobile App</pre>
                <pre>Secure Access</pre>
                <pre>Real-time Notifications</pre>
            </div>

            <div className="feature">
                <h2>Secure Withdrawals</h2>
                <p>Every transfer and withdrawal is protected with additional verification for maximum safety</p>
                <pre>Two-Factor Authentication</pre>
                <pre>High-Safety</pre>
                <pre>Fraud Detection</pre>
            </div>
        </motion.div>
    </div>
</section>


<section id="Security">
    <div className="Securities">
        <div className="line"></div>
        <h3>Security</h3>
    </div>
        <div className="security-header">
            <div className="security-header-content">
                <div className="security-copy">
                    <h2>Bank-Grade Security to Protect what Matters</h2>
                    <p>GlidPay uses advanced protection systems, <br /> encrypted infrastructure, device verification, <br /> and multiple authentication layers to keep your <br /> money and personal information secure</p>
                    <span>Learn more-</span>
                </div>
                <div className="security-header-image">
                    <img alt="security illustration" src="/images/lock.jpg" />
                </div>
            </div>
        </div>
        
        <div className="security-features">
            <div className="security">
                <h2><pre>End-to-End Encryption</pre></h2>
                <pre>Your data and transactions are fully<br /> encrypted and securely protected</pre>
                <img alt="encryption-illustration" src="/images/encription.jpg" />
            </div>
        
            <div className="security">
                <h2><pre>Secret Key Protection</pre></h2>
                <pre>Sensitive actions require your personal<br /> secret authorization key</pre>
                <img alt="secret key" src="/images/key.jpg" />
            </div>

            <div className="security">
                <h2><pre>Two-Factor Authentication</pre></h2>
                <pre>Add an extra layer of protection to<br /> your account login and<br /> transactions</pre>
                <img alt="two factor authenticator" src="/images/2 factor Authentication.jpg" />
            </div>

            <div className="security">
                <h2><pre>Real-Time Fraud Monitoring</pre></h2>
                <pre>Suspicious activities are detected <br />instantly to prevent unauthorized<br /> access</pre>
                <img alt="Fraud detecttion" src="/images/anit-fraud.jpg" />
            </div>

            <div className="security">
                <h2><pre>Device Verification</pre></h2>
                <pre>Only trusted devices can securely<br /> access your GlidPay account</pre>
                <img alt="2FA" src="/images/security.jpg" />
            </div>

            <div className="security">
                <h2><pre>Secure Cloud Infrastructure</pre></h2>
                <pre>Modern cloud systems ensure reliability,<br /> uptime, and secure transaction<br /> processing</pre>
                <img alt="cloud security" src="/images/2FA.jpg" />
            </div> 
        </div> 
        </section>

        <section id="How-it-works">

            <div className="followUp-head">
                <div className="line"></div>
                <h3>How-it-works</h3>
            </div><br /><br /><br /><br />

            <div className="followUp-Header">
                <h2>How it works</h2>
                <p> A Guided way for geting you started<br /> from zero to transacting in less <br /> than 2 minutes</p>
                <div className="line4"></div>
                <p>We made it stupid simple <br /><code style={{color: "green"}}> Sign-UP. Fund-UP. Move money</code> </p>
                <img src="/images/transfer.jpg" alt="wallet"></img>
            </div>

        <div className="Card-content">
            <div className="followUp-content">
                <h1>01</h1>
                <pre><FaUserPlus /> App signup</pre><br />
                <h2>Sign Up in Second</h2>
                <p>One account.. Full access. <br /> Register with Phone aend Email <br /> and your are in.</p>
                <div className="line1"></div>
                <span>Simple, Fast, and Free</span>
            </div>

            <div className="line2"></div>

             <div className="followUp-content">
                <h1>02</h1>
                <pre><FaWallet /> Fund Wallet</pre><br />
                <h2>Power Up your Wallet</h2>
                <p>Deposit Money instantly <br /> and watch your wallet<br /> Grow in real time </p>
                <div className="line1"></div>
                <span>fast. reliable. Always ready</span>
            </div>

             <div className="line2"></div>

             <div className="followUp-content">
                <h1>03</h1>
                <pre><FaPaperPlane /> Send & Receive</pre><br />
                <h2>Move Money Freely</h2>
                <p>Transfer to anyone <br /> Receive from anywhere  <br /> withdraw with your pin. </p>
                <div className="line1"></div>
                <span>No hidden fees, no stress</span>
            </div>
        </div>
    </section>
        <section id="about">
            <div className="about-section">
                <div className="about-copy">
                    <h2>About GlidPay</h2>
                    <p>GlidPay is your global payments partner, giving you fast, secure, and easy access to money anywhere in the world. We help individuals and businesses move money simply, safely, and with total confidence.</p>
                </div>
                <div className="footer-links">
                    <div>
                        <h3>Quick links</h3>
                        <a href="#home">Home</a>
                        <a href="#features">Features</a>
                        <a href="#Security">Security</a>
                    </div>
                    <div>
                        <h3>Support</h3>
                        <a href="#How-it-works">How it works</a>
                        <a href="#about">About</a>
                        <a href="mailto:support@glidpay.com">Contact us</a>
                    </div>
                    <div>
                        <h3>Contact</h3>
                        <p>support@glidpay.com</p>
                        <p>+1 (800) 123-4567</p>
                    </div>
                </div>
                <div className="site-footer">
                    <p>© 2026 GlidPay. Secure payments made simple.</p>
                </div>
            </div>
        </section>
        </>

    )
 }
 export default HomePage