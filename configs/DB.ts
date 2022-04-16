import mongoose from 'mongoose';

class mongoDB {
	constructor() {}

	public static connect = async () => {
		try {
			const dbName = `phonebook`;
			const dbPathUri = `mongodb://phone:phone123@phone-book-shard-00-00.enxxz.mongodb.net:27017,phone-book-shard-00-01.enxxz.mongodb.net:27017,phone-book-shard-00-02.enxxz.mongodb.net:27017/${dbName}?ssl=true&replicaSet=atlas-nsjpx5-shard-0&authSource=admin&retryWrites=true&w=majority`;
			await mongoose.connect(`${dbPathUri}`);
			console.log('DB Connected');
		} catch (error) {
			console.log(error);
		}
	};
}

export default mongoDB;
