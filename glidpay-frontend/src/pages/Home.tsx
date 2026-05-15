import "../style/Home.css"
import "../style/features.css";
function HomePage(){
    return(
        <>
<section id="home"> 

     <div className="Features-header">
        <h1>GLIDPAY</h1>
        <p>Powerful Financial FeatturesBuilt for the Modern World
            <p> GlidPay gives you a fast, secure, and simple way<br />to send, receive, store, and manage money globally <br />anytime and anywhere</p>
            <span>-Get STARTED|Download App</span>
        </p>
    </div></section>
        
<section id="features">

    <div className="features">
        <h3>feature</h3>
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
    </div>
        </section>
<section id="Security">
    <div className="Securities">
        <h3>Security</h3>
    </div>
        <div className="security-header">
            <pre>Bank-Grade Security to Protect what Matters
            <p>GlidPay uses advanced protection systems, <br /> encrypted infrastructure, device verification, <br /> and multiple authentication layers to keep your <br /> money and personal information secure</p>
            <span>Learn more-</span>
            </pre>
        </div>
        
        <div className="security-features">
            <div className="security">
                <h2><pre>End-to-End Encryption</pre></h2>
                <pre>Your data and transactions are fully encrypted and securely protected</pre>
            </div>
        
            <div className="security">
                <h2><pre>Secret Key Protection</pre></h2>
                <pre>Sensitive actions require your personal secret authorization key</pre>
            </div>

            <div className="security">
                <h2><pre>Two-Factor Authentication</pre></h2>
                <pre>Add an extra layer of protection to your account login and transactions</pre>
            </div>

            <div className="security">
                <h2><pre>Real-Time Fraud Monitoring</pre></h2>
                <pre>Suspicious activities are detected instantly to prevent unauthorized access</pre>
            </div>

            <div className="security">
                <h2><pre>Device Verification</pre></h2>
                <pre>Only trusted devices can securely access your GlidPay account</pre>
            </div>

            <div className="security">
                <h2><pre>Secure Cloud Infrastructure</pre></h2>
                <pre>Modern cloud systems ensure reliability, uptime, and secure transaction processing</pre>
            </div> 
        </div> 
        </section>
        <section id="How-it-works"></section>
        <section id="about"></section>
        </>

    )
 }
 export default HomePage