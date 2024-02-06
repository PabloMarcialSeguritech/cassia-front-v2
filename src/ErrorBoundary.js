import React, { Component } from 'react';

class ErrorBoundary extends Component {
  state = { hasError: false };

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
    // Aquí podrías también enviar el error a un servicio de registro de errores
  }

  render() {
    if (this.state.hasError) {
      // Puedes personalizar el mensaje de error aquí
      return <div>¡Ups! Algo salió mal.</div>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
