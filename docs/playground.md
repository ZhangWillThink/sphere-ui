# Playground

An interactive playground to experiment with Sphere UI components.

## Interactive Demo

Try out different components and see them in action!

<script setup lang="ts">
import { ref } from 'vue'

// Button states
const buttonLoading = ref(false)
const buttonSize = ref<'sm' | 'md' | 'lg' | 'xl'>('md')
const buttonVariant = ref<'default' | 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'>('primary')

// Input states
const inputValue = ref('')
const textareaValue = ref('')

// Select state
const selectValue = ref('')
const selectOptions = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
]

// Checkbox and Radio
const checkboxValue = ref(false)
const radioValue = ref('option1')

// Dialog
const dialogVisible = ref(false)

// Table data
const tableColumns = [
  { key: 'id', title: 'ID', sortable: true },
  { key: 'name', title: 'Name', sortable: true },
  { key: 'email', title: 'Email' },
  { key: 'role', title: 'Role' },
]

const tableData = ref([
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Developer' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Designer' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Manager' },
  { id: 4, name: 'Alice Williams', email: 'alice@example.com', role: 'Developer' },
])

// Tabs
const activeTab = ref('buttons')

const handleButtonClick = () => {
  buttonLoading.value = true
  setTimeout(() => {
    buttonLoading.value = false
  }, 2000)
}
</script>

## Component Showcase

<div class="playground-container">
  <Card class="mb-6">
    <h3 class="text-xl font-semibold mb-4">Button Playground</h3>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h4 class="font-medium mb-3">Controls</h4>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-2">Variant</label>
            <Select v-model="buttonVariant" :options="[
              { label: 'Default', value: 'default' },
              { label: 'Primary', value: 'primary' },
              { label: 'Secondary', value: 'secondary' },
              { label: 'Outline', value: 'outline' },
              { label: 'Ghost', value: 'ghost' },
              { label: 'Danger', value: 'danger' },
            ]" />
          </div>
          
          <div>
            <label class="block text-sm font-medium mb-2">Size</label>
            <Select v-model="buttonSize" :options="[
              { label: 'Small', value: 'sm' },
              { label: 'Medium', value: 'md' },
              { label: 'Large', value: 'lg' },
              { label: 'Extra Large', value: 'xl' },
            ]" />
          </div>
        </div>
      </div>
      
      <div>
        <h4 class="font-medium mb-3">Preview</h4>
        <div class="flex flex-col gap-3 items-start">
          <Button 
            :variant="buttonVariant" 
            :size="buttonSize"
            @click="handleButtonClick"
            :loading="buttonLoading"
          >
            {{ buttonLoading ? 'Loading...' : 'Click Me' }}
          </Button>
          
          <div class="text-sm text-gray-600">
            <strong>Props:</strong>
            <pre class="mt-2 p-2 bg-gray-100 rounded">variant="{{ buttonVariant }}"
size="{{ buttonSize }}"
:loading="{{ buttonLoading }}"</pre>
          </div>
        </div>
      </div>
    </div>
  </Card>

  <Card class="mb-6">
    <h3 class="text-xl font-semibold mb-4">Form Components</h3>
    
    <div class="space-y-4">
      <div>
        <label class="block text-sm font-medium mb-2">Input</label>
        <Input 
          v-model="inputValue" 
          placeholder="Type something..." 
          class="mb-2"
        />
        <p class="text-sm text-gray-600">Value: {{ inputValue || '(empty)' }}</p>
      </div>
      
      <div>
        <label class="block text-sm font-medium mb-2">Textarea</label>
        <Textarea 
          v-model="textareaValue" 
          placeholder="Enter multiple lines..."
          rows="3"
          class="mb-2"
        />
        <p class="text-sm text-gray-600">Value: {{ textareaValue || '(empty)' }}</p>
      </div>
      
      <div>
        <label class="block text-sm font-medium mb-2">Select</label>
        <Select 
          v-model="selectValue" 
          :options="selectOptions"
          placeholder="Choose an option"
          class="mb-2"
        />
        <p class="text-sm text-gray-600">Selected: {{ selectValue || '(none)' }}</p>
      </div>
      
      <div>
        <label class="block text-sm font-medium mb-2">Checkbox</label>
        <Checkbox 
          v-model="checkboxValue" 
          label="I agree to the terms and conditions"
        />
        <p class="text-sm text-gray-600 mt-2">Checked: {{ checkboxValue }}</p>
      </div>
      
      <div>
        <label class="block text-sm font-medium mb-2">Radio</label>
        <div class="space-y-2">
          <Radio v-model="radioValue" value="option1" label="Option 1" />
          <Radio v-model="radioValue" value="option2" label="Option 2" />
          <Radio v-model="radioValue" value="option3" label="Option 3" />
        </div>
        <p class="text-sm text-gray-600 mt-2">Selected: {{ radioValue }}</p>
      </div>
    </div>
  </Card>

  <Card class="mb-6">
    <h3 class="text-xl font-semibold mb-4">Data Display</h3>
    
    <div class="mb-4">
      <h4 class="font-medium mb-3">Table</h4>
      <Table :columns="tableColumns" :data="tableData" />
    </div>
    
    <div class="mb-4">
      <h4 class="font-medium mb-3">Tags</h4>
      <div class="flex gap-2 flex-wrap">
        <Tag>Default</Tag>
        <Tag variant="primary">Primary</Tag>
        <Tag variant="success">Success</Tag>
        <Tag variant="warning">Warning</Tag>
        <Tag variant="error">Error</Tag>
        <Tag variant="info">Info</Tag>
      </div>
    </div>
  </Card>

  <Card class="mb-6">
    <h3 class="text-xl font-semibold mb-4">Feedback Components</h3>
    
    <div class="space-y-4">
      <div>
        <h4 class="font-medium mb-3">Dialog</h4>
        <Button variant="primary" @click="dialogVisible = true">
          Open Dialog
        </Button>
        <Dialog v-model:visible="dialogVisible" title="Example Dialog">
          <p>This is a dialog with some content.</p>
          <p class="mt-2 text-gray-600">You can put any content here!</p>
          <template #footer>
            <Button variant="outline" @click="dialogVisible = false">Cancel</Button>
            <Button variant="primary" @click="dialogVisible = false">Confirm</Button>
          </template>
        </Dialog>
      </div>
      
      <div>
        <h4 class="font-medium mb-3">Tooltip</h4>
        <Tooltip content="This is a helpful tooltip">
          <Button variant="outline">Hover me</Button>
        </Tooltip>
      </div>
    </div>
  </Card>

  <Card>
    <h3 class="text-xl font-semibold mb-4">Layout Components</h3>
    
    <div class="space-y-4">
      <div>
        <h4 class="font-medium mb-3">Card</h4>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <h5 class="font-semibold mb-2">Card Title 1</h5>
            <p class="text-gray-600">Card content goes here.</p>
          </Card>
          <Card>
            <h5 class="font-semibold mb-2">Card Title 2</h5>
            <p class="text-gray-600">Another card with content.</p>
          </Card>
          <Card>
            <h5 class="font-semibold mb-2">Card Title 3</h5>
            <p class="text-gray-600">More card content here.</p>
          </Card>
        </div>
      </div>
      
      <div>
        <h4 class="font-medium mb-3">Divider</h4>
        <p>Content above divider</p>
        <Divider />
        <p>Content below divider</p>
      </div>
    </div>
  </Card>
</div>

<style scoped>
.playground-container {
  margin-top: 2rem;
}

.space-y-4 > * + * {
  margin-top: 1rem;
}

.space-y-2 > * + * {
  margin-top: 0.5rem;
}

pre {
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>

## Try It Yourself

The playground above demonstrates the core components of Sphere UI. You can:

- **Experiment** with different prop combinations
- **See** real-time updates as you change values
- **Understand** how components work together
- **Learn** the API through interactive examples

## Component Categories

### Basic Components
Interactive elements that form the foundation of your UI.

### Form Components
Input controls for collecting user data with validation support.

### Data Display
Components for presenting information in structured formats.

### Feedback
Components that provide user feedback and confirmations.

### Layout
Structural components for organizing your interface.

## Code Sandbox

Want to try Sphere UI in a live environment? Check out these sandboxes:

- [CodeSandbox - Basic Setup](https://codesandbox.io)
- [StackBlitz - Full Example](https://stackblitz.com)
- [GitHub - Playground Repository](https://github.com)

## Share Your Creation

Built something cool with Sphere UI? Share it with the community!

- Tweet with #SphereUI
- Post in our GitHub Discussions
- Submit your example to our showcase

## Next Steps

- Explore [Component Documentation](/components/button)
- Read the [Guide](/guide/introduction)
- Check out [Advanced Examples](/examples)