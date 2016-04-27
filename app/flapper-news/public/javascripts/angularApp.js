var app = angular.module('flapperNews', ['ui.router']);

app.factory('postsFactory', [function(){
	var o = {
		posts: []
	};
	return o;
}]);

app.controller('MainCtrl', ['$scope', 'postsFactory', function($scope, postsFactory){
	$scope.posts = postsFactory.posts;

	$scope.posts = [
		{title: 'post 1', upvotes: 5},
		{title: 'post 2', upvotes: 2},
		{title: 'post 3', upvotes: 15},
		{title: 'post 4', upvotes: 9},
		{title: 'post 5', upvotes: 4},
	];

	$scope.addPost = function(){
		if ($scope.title || $scope.title === ''){
			return;
		}

		$scope.posts.push({
			title: $scope.title,
			link: $scope.link,
			upvotes: 0, 
			// array of fake comments to the posts object, this helps us mock up the basic comments view
			comments: [
				{
					author: 'Joe',
					body: 'Cool Post',
					upvotes: 0
				},
				{
					author: 'Bob',
					body: 'Great idea but everything is wrong!',
					upvotes: 0
				}
			]
		});
		$scope.title = '';
		$scope.link = '';
	};

	$scope.incrementUpvotes = function(post){
		post.upvotes += 1;
	};

}]);

app.controller('PostsCtrl', ['$scope', '$stateParams', 'postsFactory', function($scope, $stateParams, postsFactory){

	//scope object that grabs the appropriate post from the postsFactory using the id from $stateParams
	$scope.post = postsFactory.posts[$stateParams.id];

	// function to all user to create new comments
	$scope.addComment = function(){
		if($scope.body === ''){
			return;
		}
		$scope.post.comments.push({
			body: $scope.body,
			author: 'user',
			upvotes: 0
		});
		$scope.body = '';
	};
}]);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

	$stateProvider
		.state('homeRoute', {
			url: '/home',
			templateUrl: '/home.html',
			controller: 'MainCtrl'
		})
		.state('postsRoute', {
			url: '/posts/{id}',
			templateUrl: 'posts.html',
			controller: 'PostsCtrl'
		});

	$urlRouterProvider.otherwise('home');
}]);

