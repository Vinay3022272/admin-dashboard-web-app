import React from 'react';

const About = () => {
    return (
        <div className="container mx-auto px-8 md:px-4 py-8">
  <h1 className="text-3xl font-semibold mb-4">About DashFund</h1>
  <p className="text-lg mb-6">
    DashFund is a modern crowdfunding platform built for creators, innovators, and changemakers.
    It’s your all-in-one dashboard to launch campaigns, share your story, and rally your community 
    to bring your projects to life.
  </p>

  <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
<div>
  <div className="flex items-center mb-6">
    <div>
      <h3 className="text-xl font-semibold mb-2">Your Community Supports You</h3>
      <p>Your fans and followers back your projects directly by contributing funds and sharing your story.</p>
    </div>
  </div>
  <div className="flex items-center mb-6">
    <div>
      <h3 className="text-xl font-semibold mb-2">Funding Made Simple</h3>
      <p>Start a campaign in minutes, manage your contributions, and track your progress — all in one dashboard.</p>
    </div>
  </div>


    {/* Add more steps if needed */}
  </div>

  <h2 className="text-2xl font-semibold mb-4">Benefits for Creators</h2>
  <ul className="list-disc pl-6 mb-6">
    <li className="mb-2">Receive direct financial support to fuel your projects</li>
    <li className="mb-2">Connect with your community and grow your loyal fanbase</li>
    <li className="mb-2">Easy-to-use dashboard to launch and manage campaigns</li>
    <li className="mb-2">Collaborate with other creators for bigger impact</li>
  </ul>

  <h2 className="text-2xl font-semibold mb-4">Benefits for Supporters</h2>
  <ul className="list-disc pl-6 mb-6">
    <li className="mb-2">Directly back the creators and ideas you care about</li>
    <li className="mb-2">Access exclusive perks and behind-the-scenes updates</li>
    <li className="mb-2">Join a community that makes a real difference</li>
  </ul>

  <h2 className="text-2xl font-semibold mb-4">Collaboration Opportunities</h2>
  <ul className="list-disc pl-6 mb-6">
    <li className="mb-2">Work with fellow creators to launch bigger projects</li>
    <li className="mb-2">Grow your network and reach new audiences</li>
    <li className="mb-2">Share resources and ideas to bring innovation to life</li>
  </ul>

  <h2 className="text-2xl font-semibold mb-4">Community Engagement</h2>
  <ul className="list-disc pl-6 mb-6">
    <li className="mb-2">Connect with like-minded supporters and creators</li>
    <li className="mb-2">Get real feedback and encouragement</li>
    <li className="mb-2">Join events, discussions, and exclusive community spaces</li>
  </ul>

  <h2 className="text-2xl font-semibold mb-4">Access to Resources</h2>
  <ul className="list-disc pl-6 mb-6">
    <li className="mb-2">Learn from tutorials, templates, and expert tips</li>
    <li className="mb-2">Get guidance and mentorship from experienced creators</li>
    <li className="mb-2">Stay updated on trends, tools, and best practices</li>
  </ul>

  <h2 className="text-2xl font-semibold mb-4">Recognition and Growth</h2>
  <ul className="list-disc pl-6 mb-6">
    <li className="mb-2">Showcase your work to a wider audience</li>
    <li className="mb-2">Feature in DashFund’s highlights and promotions</li>
    <li className="mb-2">Build your brand and boost your credibility as a creator</li>
  </ul>

  <h2 className="text-2xl font-semibold mb-4">A Supportive Community</h2>
  <ul className="list-disc pl-6 mb-6">
    <li className="mb-2">Be part of a platform that celebrates creativity and collaboration</li>
    <li className="mb-2">Connect, grow, and thrive with fellow creators and supporters</li>
    <li className="mb-2">Share knowledge and resources for mutual success</li>
  </ul>
</div>
   );
}

export default About;

export const metadata = {
    title: "About - DashFund",
  }
   