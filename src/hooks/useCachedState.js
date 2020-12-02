export default useCachedState = (cacheKey, initialValue={}) => {
  const cachedValue = localStorage.getItem(cacheKey);
  const [state, setState] = useState(cachedValue ? JSON.parse(cachedValue) : initialValue);

  useEffect(() => {
    localStorage.setItem(cacheKey, JSON.stringify(state));
  }, [cacheKey, state]);

  return [state, setState];
};
