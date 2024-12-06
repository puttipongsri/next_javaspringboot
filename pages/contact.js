import '../app/globals.css';
import Header from '../components/header';

export default function contact() {
    return (
        <div>
            <Header />
            <div className="min-h-screen flex items-center justify-center">
                <div className="flex gap-24">
                    <a href="https://github.com/puttipongsri" target="_blank" rel="noopener noreferrer">
                        <img src="/assets/github.png" alt="GitHub Logo" className="w-56 h-56 object-cover" />
                    </a>
                    <a href="https://www.facebook.com/bank.puttipong.2024" target="_blank" rel="noopener noreferrer">
                        <img src="/assets/facebook.png" alt="Facebook Logo" className="w-56 h-56 object-cover" />
                    </a>
                    <a href="https://www.instagram.com/bankk.p?igsh=OWJtdTBtc2ViZW5j&utm_source=qr" target="_blank" rel="noopener noreferrer">
                        <img src="/assets/ig.png" alt="IG Logo" className="w-56 h-56 object-cover" />
                    </a>
                </div>
            </div>
        </div>
    );
}
