import { ThreeCircles } from "react-loader-spinner";
import { useState, useEffect } from "react";
import styles from '@/styles/Loading.module.css'

export default function LoadingScreen(props) {

    const [isLoading, setIsLoading] = useState()

    useEffect(() => {
        props.loading ? setIsLoading(true) : setIsLoading(false)
    }, [props.loading])

    return (
        <>
        {
            isLoading &&
            <div className={styles.loadingScreen}>
                <ThreeCircles 
                    height="100"
                    width="100"
                    color="#4fa94d"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    ariaLabel="three-circles-rotating"
                    outerCircleColor=""
                    innerCircleColor=""
                    middleCircleColor=""
                />

            </div>
        }
        </>
    )
}