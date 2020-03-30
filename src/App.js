import React from 'react';

//　環境変数で定義したアクセストークンを認識させる
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

console.log({ GITHUB_TOKEN })

function App() {
  return (
    <>
      Hello, GraphQL
    </>
  );
}

export default App;
