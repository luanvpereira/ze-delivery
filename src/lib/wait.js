const ids = {};

const wait = (id, time) => {
	return new Promise(resolve => {
		clearTimeout(ids[id]);
		ids[id] = setTimeout(() => {
			resolve();
		}, time);
	});
};

export default wait;
