import SwiftUI
import PhotosUI

struct SetupAccView: View {
    @State private var name = ""
    @State private var email = ""
    @State private var password = ""
    @State private var selectedPhotos: [PhotosPickerItem] = []
    @State private var images: [UIImage] = []
    
    @State private var tagInput = ""
    @State private var tags: [String] = []
    
    @State private var message = ""

    var body: some View {
        ScrollView {
            VStack(spacing: 20) {
                Text("Welcome! We are excited to have you here :)")
                    .font(.headline)
                    .multilineTextAlignment(.center)
                    .padding(.top, 50)
                    .padding(.bottom, 10)

                Text("Set up your profile")
                    .font(.largeTitle)
                    .bold()
                    .padding(.bottom, 20)

                VStack {
                    LazyVGrid(columns: Array(repeating: GridItem(.flexible()), count: 3), spacing: 10) {
                        ForEach(images.indices, id: \.self) { index in
                            Image(uiImage: images[index])
                                .resizable()
                                .scaledToFill()
                                .frame(width: 100, height: 100)
                                .cornerRadius(10)
                        }
                    }

                    if images.count < 5 {
                        PhotosPicker("Add Photos", selection: $selectedPhotos, matching: .images)
                            .onChange(of: selectedPhotos) { newItems in
                                loadImages(items: newItems)
                            }
                    } else {
                        Text("Maximum of 5 photos allowed")
                            .font(.footnote)
                            .foregroundColor(.red)
                    }
                }

                TextField("Name", text: $name)
                    .textFieldStyle(RoundedBorderTextFieldStyle())

                TextField("Email", text: $email)
                    .textFieldStyle(RoundedBorderTextFieldStyle())
                    .keyboardType(.emailAddress)
                    .autocapitalization(.none)

                SecureField("Password", text: $password)
                    .textFieldStyle(RoundedBorderTextFieldStyle())

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

                Button("Create Account") {
                    setupAccount()
                }
                .padding()
                .foregroundColor(.white)
                .background(Color.blue)
                .cornerRadius(8)

                if !message.isEmpty {
                    Text(message)
                        .foregroundColor(message == "Account created successfully!" ? .blue : .red)
                }
            }
            .padding()
        }
    }

    private func setupAccount() {
        if name.isEmpty || email.isEmpty || password.isEmpty {
            message = "Please fill out all fields."
        } else {
            message = "Account created successfully!"
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

    private func loadImages(items: [PhotosPickerItem]) {
        for item in items.prefix(5 - images.count) {
            item.loadTransferable(type: Data.self) { result in
                switch result {
                case .success(let data):
                    if let data = data, let uiImage = UIImage(data: data) {
                        DispatchQueue.main.async {
                            images.append(uiImage)
                        }
                    }
                case .failure(let error):
                    print("Error loading image: \(error)")
                }
            }
        }
    }
}

struct SetupAccView_Previews: PreviewProvider {
    static var previews: some View {
        SetupAccView()
    }
}
