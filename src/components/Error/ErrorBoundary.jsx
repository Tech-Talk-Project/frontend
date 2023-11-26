import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, info: null };
  }

  static getDerivedStateFromError(error) {
    // 다음 렌더링에서 폴백 UI가 보이도록 상태를 업데이트 합니다.
    return { hasError: true, info: error };
  }

  // componentDidCatch(error, errorInfo) {
  //   // 에러 리포팅 서비스에 에러를 기록할 수도 있습니다.
  //   console.log(error, errorInfo);
  // }

  render() {
    const { hasError, info } = this.state;
    const { children } = this.props;

    if (hasError) {
      // 폴백 UI를 커스텀하여 렌더링할 수 있습니다.
      return <this.props.fallback error={info} />;
    }
    return children;
  }
}

export default ErrorBoundary;
