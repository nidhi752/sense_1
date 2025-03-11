import React from 'react';
import { BarChart, Users, Activity, Settings } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Total Translations</h3>
            <Activity className="h-6 w-6 text-indigo-600" />
          </div>
          <p className="text-3xl font-bold">1,234</p>
          <p className="text-sm text-gray-500">+12% from last month</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Active Users</h3>
            <Users className="h-6 w-6 text-indigo-600" />
          </div>
          <p className="text-3xl font-bold">856</p>
          <p className="text-sm text-gray-500">+5% from last month</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Accuracy Rate</h3>
            <BarChart className="h-6 w-6 text-indigo-600" />
          </div>
          <p className="text-3xl font-bold">95%</p>
          <p className="text-sm text-gray-500">+2% from last month</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Processing Time</h3>
            <Settings className="h-6 w-6 text-indigo-600" />
          </div>
          <p className="text-3xl font-bold">0.5s</p>
          <p className="text-sm text-gray-500">Average per translation</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold mb-6">Recent Activity</h3>
          <div className="space-y-4">
            {/* Activity items would go here */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-600">No recent activity</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold mb-6">Model Performance</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">Sign Recognition</span>
              <span className="font-semibold">98%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '98%' }}></div>
            </div>

            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">Translation Accuracy</span>
              <span className="font-semibold">95%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '95%' }}></div>
            </div>

            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">Response Time</span>
              <span className="font-semibold">92%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '92%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;