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
                    color=""
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    ariaLabel="three-circles-rotating"
                    outerCircleColor="var(--green-100)"
                    innerCircleColor="var(--green-200)"
                    middleCircleColor="var(--menuGreen)"
                />

            </div>
        }
        </>
    )
}