import { useEffect, useState } from "react";
import "./Preloader.css";

const Preloader = () => {
    const [visible, setVisible] = useState(true);
    const [progress, setProgress] = useState(0);
    const [exiting, setExiting] = useState(false);

    useEffect(() => {
        const start = Date.now();
        const duration = 2200;
        let exitTimeout;

        const interval = setInterval(() => {
            const elapsed = Date.now() - start;
            const value = Math.min(Math.round((elapsed / duration) * 100), 100);
            setProgress(value);

            if (value >= 100) {
                clearInterval(interval);
                setExiting(true);
                exitTimeout = setTimeout(() => setVisible(false), 850);
            }
        }, 25);

        return () => {
            clearInterval(interval);
            clearTimeout(exitTimeout);
        };
    }, []);

    if (!visible) return null;

    return (
        <div
            className={`preloader${exiting ? " is-exiting" : ""}`}
            aria-label="Loading website"
            aria-busy={!exiting}
        >
            <div className="preloader-orb preloader-orb-one" aria-hidden="true" />
            <div className="preloader-orb preloader-orb-two" aria-hidden="true" />
            <div className="preloader-grid" aria-hidden="true" />

            <div className="preloader-inner">
                <div className="preloader-brand">
                    <span className="brand-mark" aria-hidden="true">
                        <span />
                        <span />
                        <span />
                    </span>
                    <span className="brand-name">SHENRON</span>
                    <span className="brand-light">DIGITAL</span>
                </div>

                <div className="preloader-eyebrow">
                    <span className="eyebrow-line" />
                    CREATIVITY MEETS TECHNOLOGY
                </div>

                <div className="preloader-headline">
                    <div className="headline-line headline-line-one">Ideas into</div>
                    <div className="headline-line headline-accent">Digital Impact<span>.</span></div>
                </div>

                <p className="preloader-caption">
                    We are preparing something meaningful.
                </p>

                <div className="loader-bottom">
                    <div
                        className="loader-track"
                        role="progressbar"
                        aria-label="Website loading progress"
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-valuenow={progress}
                    >
                        <div className="loader-progress" style={{ width: `${progress}%` }} />
                    </div>

                    <div className="loader-meta">
                        <span className="loader-status">
                            <span className="status-dot" /> BUILDING WHAT'S NEXT
                        </span>
                        <span className="loader-percent">{String(progress).padStart(2, "0")}<span>%</span></span>
                    </div>
                </div>
            </div>

            <div className="preloader-footer" aria-hidden="true">
                <span>INNOVATION</span>
                <span className="footer-divider" />
                <span>DESIGN</span>
                <span className="footer-divider" />
                <span>DEVELOPMENT</span>
            </div>
        </div>
    );
};

export default Preloader;
