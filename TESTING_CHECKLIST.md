# Logistics Demo Interactive - Testing Checklist

## Tutorial System Tests

### Initial Load
- [ ] Tutorial overlay shows on first visit
- [ ] Tutorial overlay is hidden if "Don't show again" was checked previously
- [ ] "Don't show again" checkbox is visible in footer
- [ ] Skip button is visible and clickable

### Tutorial Functionality
- [ ] Office Manager tour starts when clicking Office Manager card
- [ ] Dispatcher tour starts when clicking Dispatcher card
- [ ] Driver tour starts when clicking Driver card
- [ ] Customer tour starts when clicking Customer card
- [ ] Tutorial overlay closes when tour starts
- [ ] Hints appear with green background (fixed position)
- [ ] Hints are visible on top of all content (z-index 999)
- [ ] Views switch correctly for each tutorial step
- [ ] Tutorial progresses through all steps automatically

### LocalStorage Tests
- [ ] Checking "Don't show again" + Skip saves preference
- [ ] Reloading page with preference set keeps tutorial hidden
- [ ] Clearing localStorage shows tutorial again

## View Navigation Tests

- [ ] Dashboard view loads and displays stats
- [ ] Active Loads (Dispatcher) view shows list and scheduler toggle
- [ ] Create Ticket view shows form and preview
- [ ] Driver App view shows phone mockup + feature descriptions
- [ ] Customers view shows list/block toggle
- [ ] Customer Portal view displays correctly
- [ ] Reports view shows revenue summary + QB queue
- [ ] ROI & Analytics view displays charts
- [ ] Settings & Users view shows user management

## Red Team Features Tests

### Safety Check Modal
- [ ] Modal appears when clicking "Create Ticket"
- [ ] All 4 checkboxes must be checked to enable Confirm button
- [ ] Confirm button is disabled by default
- [ ] Clicking Confirm closes modal and allows ticket creation
- [ ] Insurance compliance warning is visible

### Access Revocation
- [ ] Red "Revoke" buttons visible on all users
- [ ] Clicking Revoke shows confirmation dialog
- [ ] Confirmation dialog lists: Deactivate login, Invalidate sessions, Remove BYOD
- [ ] Confirming changes status badge to "Revoked"
- [ ] Toast notification appears confirming action

### Dispatcher Scheduler
- [ ] Toggle buttons (List/Scheduler) are visible
- [ ] Clicking Scheduler shows grid view
- [ ] Time slots and trucks are displayed correctly
- [ ] Load cards are draggable
- [ ] Dropping load in new slot works
- [ ] Visual feedback during drag (opacity, background highlight)
- [ ] Toast notification on successful drop
- [ ] Switching back to List view works

## UX Features Tests

### Reports Section
- [ ] Sidebar shows "Reports" (not "QuickBooks Sync")
- [ ] Revenue Summary Card displays stats
- [ ] Export All Data button is visible
- [ ] QuickBooks Review Queue shows tickets
- [ ] Approve/Reject buttons work
- [ ] Sync Settings card displays toggles
- [ ] Account Mapping card shows QB settings

### Driver App Features
- [ ] Phone mockup displays on left
- [ ] 4 feature cards display on right:
  - Offline Mode - Rural Ready
  - Union Time Clock Integration
  - Photo & Signature Capture
  - Instant Invoice Delivery
- [ ] Feature cards have proper icons and colors
- [ ] Two-column layout works properly

### Book a Demo CTA
- [ ] CTA button is visible at bottom of sidebar
- [ ] Button has gradient styling
- [ ] "See your system in 15 minutes" subtext visible
- [ ] Clicking opens HubSpot meeting scheduler

### Light/Dark Mode
- [ ] Toggle button visible in header
- [ ] Moon icon shows in dark mode
- [ ] Sun icon shows in light mode
- [ ] Clicking toggle switches theme
- [ ] Light theme colors apply correctly
- [ ] Dark theme colors apply correctly
- [ ] Theme preference saved in localStorage
- [ ] Reloading page remembers theme preference

## Form & Interaction Tests

### Ticket Form
- [ ] Customer dropdown works
- [ ] Discount badge appears for applicable customers
- [ ] Material dropdown works
- [ ] Hazmat field appears for fuel materials
- [ ] Quantity and Price inputs work
- [ ] Truck dropdown works
- [ ] Print button works
- [ ] PDF button works
- [ ] Create Ticket triggers Safety Check modal

### Customer Management
- [ ] Search input works
- [ ] Filter dropdown works
- [ ] List/Block toggle works
- [ ] Clicking "View Details" opens customer detail modal
- [ ] Customer detail modal shows:
  - Contact information
  - Custom pricing
  - Delivery history
- [ ] Close button on modal works

### Active Loads
- [ ] Load cards display correctly
- [ ] Status badges show proper colors
- [ ] Revenue amounts display
- [ ] Real-time updates badge is visible

## Browser Compatibility Tests

- [ ] Chrome - All features work
- [ ] Safari - All features work
- [ ] Firefox - All features work
- [ ] Edge - All features work
- [ ] Mobile Safari - Responsive layout works
- [ ] Mobile Chrome - Responsive layout works

## Performance Tests

- [ ] Page loads in under 3 seconds
- [ ] No console errors on load
- [ ] No console warnings
- [ ] Smooth animations (no jank)
- [ ] Drag-and-drop is responsive

## Accessibility Tests

- [ ] All buttons have hover states
- [ ] Form inputs have proper labels
- [ ] Color contrast is sufficient in both themes
- [ ] Tab navigation works through forms
- [ ] Modal can be closed with Escape key (if implemented)

---

## Critical Issues Found

<!-- Document any critical issues here -->

## Non-Critical Issues Found

<!-- Document any non-critical issues here -->

## Notes

<!-- Any additional notes or observations -->
