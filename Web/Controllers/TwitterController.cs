using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using Hammock.Authentication.OAuth;
using TweetSharp;

namespace Web.Controllers
{
    public class TwitterController : ApiController
    {
        internal TwitterService TwitService
        {
            get { return new TwitterService(ConsumerKey, ConsumerSecret, AccessToken, AccessTokenSecret); }
        }

        #region Keys
        private static string ConsumerSecret
        {
            get { return ConfigurationManager.AppSettings["consumerSecret"]; }
        }
 
        private static string ConsumerKey
        {
            get { return ConfigurationManager.AppSettings["consumerKey"]; }
        }
        private static string AccessToken
        {
            get { return ConfigurationManager.AppSettings["accessToken"]; }
        }

        private static string AccessTokenSecret
        {
            get { return ConfigurationManager.AppSettings["accessTokenSecret"]; }
        }
        #endregion

        [HttpGet]
        public bool TweetMessage(string message)
        {
            try
            {
                TwitService.AuthenticateWith(ConsumerKey,ConsumerSecret,AccessToken, AccessTokenSecret);
                TwitService.SendTweet(new SendTweetOptions {Status = message});
                return true;
            }
            catch (Exception)
            {
                return false;
                throw;
            }
        }  

        [HttpGet]
        public TwitterStatus[] GetPosts()
        {
            try
            {
                TwitService.AuthenticateWith(ConsumerKey,ConsumerSecret,AccessToken, AccessTokenSecret);
                return TwitService.ListTweetsOnUserTimeline(new ListTweetsOnUserTimelineOptions() {Count = 100, ScreenName = "PietPompiesDev"}).ToArray();
            }
            catch (Exception)
            {
                throw;
            }
        }  
    }
}
