import SwiftUI
import PhotosUI

struct EventCreateView: View {
    @State private var eventName = ""
    @State private var description = ""
    @State private var location = ""
    @State private var eventDate = Date()
    @State private var selectedImage: Image? = nil
    @State private var eventImageItem: PhotosPickerItem? = nil
    @State private var message = ""
    @State private var tagInput = ""
    @State private var tags: [String] = []
    
    //ADD TAGSSS!!!!

    var body: some View {
        ScrollView {
            VStack(spacing: 20) {
                Text("Create a New Event")
                    .font(.largeTitle)
                    .bold()
                    .padding(.bottom, 20)

                TextField("Event Name", text: $eventName)
                    .textFieldStyle(RoundedBorderTextFieldStyle())

                TextField("Describe the Event", text: $description, axis: .vertical)
                    .textFieldStyle(RoundedBorderTextFieldStyle())
                    .lineLimit(4)

                TextField("Where is it??", text: $location)
                    .textFieldStyle(RoundedBorderTextFieldStyle())

                VStack(alignment: .leading, spacing: 10) {
                    Text("Pick a Date")
                        .font(.headline)
                    DatePicker("Select Date", selection: $eventDate, displayedComponents: [.date])
                        .datePickerStyle(GraphicalDatePickerStyle())

                    Text("and a Time")
                        .font(.headline)
                    DatePicker("Select Time", selection: $eventDate, displayedComponents: [.hourAndMinute])
                        .labelsHidden()
                        .datePickerStyle(WheelDatePickerStyle())
                }

                VStack {
                    if let image = selectedImage {
                        image
                            .resizable()
                            .scaledToFit()
                            .frame(height: 200)
                            .cornerRadius(15)
                            .overlay(RoundedRectangle(cornerRadius: 10).stroke(Color.gray, lineWidth: 1))
                    } else {
                        RoundedRectangle(cornerRadius: 10)
                            .frame(height: 200)
                            .foregroundColor(.gray.opacity(0.2))
                            .overlay(Text("Add a Poster here!").foregroundColor(.gray))
                    }

                    PhotosPicker("Choose Image", selection: $eventImageItem, matching: .images)
                        .onChange(of: eventImageItem) { newItem in
                            loadEventImage(item: newItem)
                        }
                }
                
                VStack(alignment: .leading, spacing: 10) {
                    Text("Add Tags")
                        .font(.headline)

                    HStack {
                        TextField("Type a tag", text: $tagInput)
                            .textFieldStyle(RoundedBorderTextFieldStyle())

                        Button("Add Tag") {
                            addTag()
                        }
                        .disabled(tagInput.isEmpty)
                    }

                    if !tags.isEmpty {
                        ScrollView(.horizontal, showsIndicators: false) {
                            HStack {
                                ForEach(tags, id: \.self) { tag in
                                    HStack {
                                        Text(tag)
                                        Button("x") {
                                            removeTag(tag)
                                        }
                                    }
                                    .padding(.horizontal)
                                    .padding(.vertical, 5)
                                    .background(Color.green.opacity(0.2))
                                    .cornerRadius(10)
                                }
                            }
                        }
                    }
                }


                Button("Create Event") {
                    createEvent()
                }
                .padding()
                .foregroundColor(.white)
                .background(Color.blue)
                .cornerRadius(8)

                if !message.isEmpty {
                    Text(message)
                        .foregroundColor(message == "Event created successfully!" ? .blue : .red)
                }
            }
            .padding()
        }
    }

    private func loadEventImage(item: PhotosPickerItem?) {
        guard let item = item else { return }
        
        item.loadTransferable(type: Data.self) { result in
            switch result {
            case .success(let data):
                if let data = data, let uiImage = UIImage(data: data) {
                    selectedImage = Image(uiImage: uiImage)
                }
            case .failure(let error):
                print("Error loading image: \(error)")
            }
        }
    }
    
    private func addTag() {
        if !tagInput.isEmpty && !tags.contains(tagInput) {
            tags.append(tagInput)
            tagInput = ""
        }
    }
    
    private func removeTag(_ tag: String) {
        tags.removeAll { $0 == tag }
    }

    private func createEvent() {
        if eventName.isEmpty || description.isEmpty || location.isEmpty {
            message = "Please fill out all fields."
        } else if selectedImage == nil {
            message = "Please add an event image"
        } else {
            message = "Event created successfully!!"
        }
    }
}

struct EventCreationView_Previews: PreviewProvider {
    static var previews: some View {
        EventCreateView()
    }
}

