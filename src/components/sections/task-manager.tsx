import React from 'react';

export default function TaskManager() {
  return (
    <section className="bg-gray-100 dark:bg-gray-800 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-8">
          Manage Your Tasks Effortlessly
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            {/* TODO: Add comments here indicating where to emphasize benefits and human connection */}
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
              Our intuitive task manager makes it easy to post tasks, track progress, and communicate with service providers.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
              For service providers, it's a simple way to find relevant tasks, manage their workload, and get paid efficiently.
            </p>
          </div>
          <div className="relative">
            {/* TODO: Add comments here indicating where to incorporate human-centric imagery */}
            {/* Placeholder for an image showing the task management process */}
            <img
              src="https://via.placeholder.com/600x400"
              alt="Task management interface"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
