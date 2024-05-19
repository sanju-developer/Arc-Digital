import React from 'react';
import Banner from '../components/banner';

// Define a type for the props of the component
type ComponentProps = {
	// Define the props of the component here
};

// Define a type for the props of the HOC
type HocProps = {
	// Define any additional props that the HOC might accept here
};

// Define a type for the combined props of the HOC-wrapped component
type CombinedProps = ComponentProps & HocProps;

// Define the Higher-Order Component
export function withBanner<P extends ComponentProps>(
	Component: React.ComponentType<P>
): React.FC<CombinedProps> {
	// Return a new component that renders the input component with additional props
	const ComponentWithBanner: React.FC<CombinedProps> = (props) => {
		// Render the input component with the additional props
		return <> <Banner /> <Component {...props as P} /> </>;
	};

	// Return the new component
	return ComponentWithBanner;
}
