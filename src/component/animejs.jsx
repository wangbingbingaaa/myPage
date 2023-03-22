// import anime, { AnimeParams, AnimeInstance } from 'animejs';
import { useRef, useLayoutEffect } from 'react';

const useAnime = (props) => {
    const animateTargetRef = useRef();
    const animationRef = useRef();

    useLayoutEffect(() => {
        if (!animateTargetRef.current) {
            console.warn('please bind the anime ref while useAnime');
            return;
        }

        animationRef.current = anime({
            ...props.animVal,
            targets: [animateTargetRef.current],
        });



    }, [props]);
    return { animateTargetRef, animationRef }
}

export default useAnime;

