import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useCart } from './CartContext'; // Importar el hook del contexto
import ResumenCompra from './ResumenCompra'; // Reutilizar el resumen de compra

const Payment = () => {
    const { cart } = useCart(); // Obtener los productos del carrito
    const [paymentMethod, setPaymentMethod] = useState(''); // Almacena el método de pago seleccionado
    const [paymentDetails, setPaymentDetails] = useState({
        cardNumber: '',
        cardHolder: '',
        expirationDate: '',
        cvv: '',
        paypalEmail: '',
        bankDetails: ''
    });
    const [comprobante, setComprobante] = useState('boleta'); // Boleta o Factura
    const [dniOrRuc, setDniOrRuc] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();  // Usamos useNavigate para la redirección

    const totalAmount = cart.reduce((acc, item) => acc + item.cantidad * item.precio, 0); // Calcular el total

    const handlePaymentMethodChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    const handleComprobanteChange = (e) => {
        setComprobante(e.target.value);
        setDniOrRuc(''); // Limpiar el campo cuando cambiamos el tipo de comprobante
        setError('');
    };

    const handleDniOrRucChange = (e) => {
        setDniOrRuc(e.target.value);
        setError('');
    };

    const handleCardInfoChange = (e) => {
        setPaymentDetails({ ...paymentDetails, [e.target.name]: e.target.value });
    };

    const handlePaypalInfoChange = (e) => {
        setPaymentDetails({ ...paymentDetails, paypalEmail: e.target.value });
    };

    const handleBankInfoChange = (e) => {
        setPaymentDetails({ ...paymentDetails, bankDetails: e.target.value });
    };

    const handleContinue = () => {
        if (!paymentMethod) {
            alert('Por favor, selecciona un método de pago.');
            return;
        }

        if (!dniOrRuc || (comprobante === 'boleta' && dniOrRuc.length !== 8) || (comprobante === 'factura' && dniOrRuc.length !== 11)) {
            setError('El número de documento no es válido. Verifica el DNI (8 dígitos) o RUC (11 dígitos).');
            return;
        }

        // Si todo está bien, navegamos al comprobante de pago y pasamos los datos
        navigate('/comprobante', {
            state: {
                paymentDetails,
                cart,
                totalAmount,
                comprobante,
                dniOrRuc
            }
        });
    };

    const handlePayment = async () => {
        if (!paymentMethod) {
            alert('Por favor, selecciona un método de pago.');
            return;
        }

        const tipo_documento = comprobante === 'boleta' ? 'DNI' : 'RUC';
        const numero_documento = dniOrRuc;

        if (!numero_documento || (tipo_documento === 'DNI' && numero_documento.length !== 8) || (tipo_documento === 'RUC' && numero_documento.length !== 11)) {
            alert('El número de documento no es válido. Verifica el DNI (8 dígitos) o RUC (11 dígitos).');
            return;
        }

        const payload = {
            metodo_pago: paymentMethod,
            tipo_documento,
            numero_documento,
        };

        try {
            const response = await fetch('http://localhost:5000/actualizar-pago', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (response.ok) {
                alert('Pago registrado exitosamente.');
                navigate('/comprobante', { state: { paymentDetails, cart, totalAmount } });
            } else {
                alert(`Error: ${data.error}`);
            }
        } catch (error) {
            console.error('Error al registrar el pago:', error);
            alert('Ocurrió un error al registrar el pago.');
        }
    };

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <Link to="/">
                    <img 
                        src="../../backend/images/izitech.png" 
                        alt="Izitech Logo" 
                        style={{ height: '50px', marginBottom: '10px' }}
                    />
                </Link>
                <h2 style={{ color: '#333', fontWeight: 'bold' }}>Completa tu información de pago</h2>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
                <div style={{ flex: '1 1 400px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#fff', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                    <h3 style={{ borderBottom: '2px solid #007BFF', paddingBottom: '10px', color: '#007BFF' }}>Método de Pago</h3>

                    <form>
                        <label htmlFor="paymentMethod" style={{ display: 'block', marginTop: '15px' }}>Selecciona tu método de pago:</label>
                        <select
                            id="paymentMethod"
                            value={paymentMethod}
                            onChange={handlePaymentMethodChange}
                            required
                            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', marginTop: '5px' }}
                        >
                            <option value="">-- Seleccionar --</option>
                            <option value="creditCard">Tarjeta de Crédito</option>
                            <option value="paypal">PayPal</option>
                            <option value="bankTransfer">Transferencia Bancaria</option>
                        </select>

                        {paymentMethod === 'creditCard' && (
                            <div style={{ marginTop: '15px' }}>
                                <h4 style={{ color: '#555' }}>Información de Tarjeta de Crédito</h4>
                                {['cardNumber', 'cardHolder', 'expirationDate', 'cvv'].map(field => (
                                    <div key={field} style={{ marginTop: '10px' }}>
                                        <label htmlFor={field} style={{ display: 'block' }}>{
                                            field === 'cardNumber' ? 'Número de Tarjeta:' :
                                            field === 'cardHolder' ? 'Titular de la Tarjeta:' :
                                            field === 'expirationDate' ? 'Fecha de Vencimiento:' : 'CVV:'
                                        }</label>
                                        <input
                                            type={field === 'cvv' ? 'text' : field === 'expirationDate' ? 'month' : 'text'}
                                            id={field}
                                            name={field}
                                            value={paymentDetails[field]}
                                            onChange={handleCardInfoChange}
                                            required
                                            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}

                        {paymentMethod === 'paypal' && (
                            <div style={{ marginTop: '15px' }}>
                                <h4 style={{ color: '#555' }}>Información de PayPal</h4>
                                <label htmlFor="paypalEmail" style={{ display: 'block' }}>Correo Electrónico:</label>
                                <input
                                    type="email"
                                    id="paypalEmail"
                                    value={paymentDetails.paypalEmail}
                                    onChange={handlePaypalInfoChange}
                                    required
                                    style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                                />
                            </div>
                        )}

                        {paymentMethod === 'bankTransfer' && (
                            <div style={{ marginTop: '15px' }}>
                                <h4 style={{ color: '#555' }}>Información Bancaria</h4>
                                <label htmlFor="bankDetails" style={{ display: 'block' }}>Detalles Bancarios:</label>
                                <input
                                    type="text"
                                    id="bankDetails"
                                    value={paymentDetails.bankDetails}
                                    onChange={handleBankInfoChange}
                                    required
                                    style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                                />
                            </div>
                        )}
                    </form>
                </div>

                <div style={{ flex: '1 1 400px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#fff', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                    <h3 style={{ borderBottom: '2px solid #007BFF', paddingBottom: '10px', color: '#007BFF' }}>Comprobante de Pago</h3>

                    <form>
                        <label htmlFor="comprobante" style={{ display: 'block', marginTop: '15px' }}>Tipo de Comprobante:</label>
                        <select
                            id="comprobante"
                            value={comprobante}
                            onChange={handleComprobanteChange}
                            required
                            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', marginTop: '5px' }}
                        >
                            <option value="boleta">Boleta</option>
                            <option value="factura">Factura</option>
                        </select>

                        <label htmlFor="dniOrRuc" style={{ display: 'block', marginTop: '15px' }}>{comprobante === 'boleta' ? 'DNI:' : 'RUC:'}</label>
                        <input
                            type="text"
                            id="dniOrRuc"
                            value={dniOrRuc}
                            onChange={handleDniOrRucChange}
                            required
                            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                        />
                        {error && <p style={{ color: 'red', marginTop: '5px' }}>{error}</p>}
                    </form>

                    <button onClick={handleContinue} style={{ marginTop: '20px', padding: '10px 20px', borderRadius: '4px', backgroundColor: '#007BFF', color: '#fff', border: 'none', cursor: 'pointer' }}>
                        Continuar
                    </button>
                </div>
                
            </div>
            <div 
                    style={{ 
                        flex: '1 1 400px', 
                        padding: '20px', 
                        border: '1px solid #ddd', 
                        borderRadius: '8px', 
                        backgroundColor: '#fff', 
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' 
                    }}
                >
                    <h3 style={{ borderBottom: '2px solid #28A745', paddingBottom: '10px', color: '#28A745' }}>
                        Resumen de Compra
                    </h3>
                    <ResumenCompra cart={cart} />
                    <hr />
                    <h3 style={{ textAlign: 'right', marginTop: '10px' }}>
                        Total: S/ {totalAmount.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </h3>
                </div>
        </div>
    );
};

export default Payment;
