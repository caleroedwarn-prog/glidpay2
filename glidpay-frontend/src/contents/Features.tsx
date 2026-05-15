import "../style/features.css";
export default function Features(){
   return(
    <>
    <div className="Features-header">
        <h1>GLIDPAY</h1>
        <p>Powerful Financial FeatturesBuilt for the Modern World
            <p> GlidPay gives you a fast, secure, and simple way<br />to send, receive, store, and manage money globally <br />anytime and anywhere</p>
            <span>-Get STARTED|Download App</span>
        </p>
    </div>

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
    </>
   ) 
}