const request = require('supertest');
const server = require('./server.js');

describe('Authentication', function(){

	it('should return 401 if not logged in /notes', function(done){
		request(server)
			.get('/notes')
			.set('Accept', 'application/json')
			.expect(401, done)
	})

	it('should return 401 if not logged in /notes/:id', function(done){
		request(server)
			.get('/notes/1')
			.set('Accept', 'application/json')
			.expect(401, done)
	})

	it('should return 401 on a failed login', function(done){
		request(server)
			.post('/users/login')
			.send({username: 'jimmy', password: '12345'})
			.set('Accept', 'application/json')
			.expect(401, done)
	})

	it('should validate with a jwt on signup', function(done){
		request(server)
			.post('/users/register')
			.send({username: 'jimmy', 'email': 'jimmy@yahoo.com', password: '12345'})
			.end(function(err, res){
				token = res.body.token
				request(server)
					.get('/notes')
					.set('Authorization', token)
					// checking its validated
					.expect(200)
					.end(function(err,res){
						//making sure token is there
						expect(typeof token).toBe('string')
						if (err) return done(err);
        		done();
					})
			})
	})

	it('should validate with a jwt on login', function(done){
		request(server)
			.post('/users/login')
			.send({username: 'jimmy', password: '12345'})
			.set('Accept', 'application/json')
			// checking its validated
			.expect(200)
			.end(function(err, res){
				//making sure token is there
				expect(typeof token).toBe('string')
				if (err) return done(err);
				done();
			})
	})
})

describe('/notes CRUD', function(){

	it('should create a note!', function(done){
		request(server)
			.post('/notes')
			.send({title: 'new note', text: 'Sample Text', author: 'jimmy'})
			.set('Accept', 'application/json')
			.expect(201, done)
	})

	it('should return 400 error if missing title/text post', function(done){
		request(server)
			.post('/notes')
			.send({title: '', text: '', author: 'jimmy'})
			.set('Accept', 'application/json')
			.expect(400, done)
	})

	it('should update a note', function(done){
		request(server)
			.put('/notes/1')
			.send({title: 'updated note 1', text: 'Sample Text One', author: 'jimmy'})
			.expect(200)
			.end(function(err, res){
				expect(typeof res).toBe('object')
				if (err) return done(err);
				done();
			})
	})

	it('should return 400 error if missing title/text update', function(done){
		request(server)
			.put('/notes/1')
			.send({title: '', text: '', author: 'jimmy'})
			.expect(400, done)
	})

	it('should return 200 if logged in /notes', function(done){
		request(server)
			.get('/notes')
			.set('Authorization', token)
			.expect(200, done)
	})

	it('should return 200 if logged in /notes/:id', function(done){
		request(server)
			.get('/notes/1')
			.set('Authorization', token)
			.expect(200, done)
	})

	it('should delete a note', function(done) {
		request(server)
			.del('/notes/2')
			.expect(200, done)
	})

	it('should respond with 404 no note found to delete', function(done){
		request(server)
			.del('/notes/400')
			.expect(404, done)
	})

})