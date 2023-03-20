import {Html,  useProgress} from '@react-three/drei';
const Loader = () => {
  const {progress} = useProgress();

  return (
      <Html>
        {/* 이미지가 나오기 전 로딩 */}
        <span className='canvas-load'></span>
        <p
          style={{
            fontSize: 14,
            color : '#f1f1f1',
            fontWeight: 800,
            marginTop: 40
          }}
        >{progress.toFixed(2)}%</p>
      </Html>
  )
}

export default Loader
