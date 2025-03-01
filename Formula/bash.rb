class Bash < Formula
  desc "Bourne-Again SHell, a UNIX command interpreter"
  homepage "https://www.gnu.org/software/bash/"
  license "GPL-3.0-or-later"
  head "https://git.savannah.gnu.org/git/bash.git", branch: "master"

  stable do
    url "https://ftp.gnu.org/gnu/bash/bash-5.2.tar.gz"
    mirror "https://ftpmirror.gnu.org/bash/bash-5.2.tar.gz"
    mirror "https://mirrors.kernel.org/gnu/bash/bash-5.2.tar.gz"
    mirror "https://mirrors.ocf.berkeley.edu/gnu/bash/bash-5.2.tar.gz"
    sha256 "a139c166df7ff4471c5e0733051642ee5556c1cc8a4a78f145583c5c81ab32fb"
    version "5.2.9"

    %w[
      001 f42f2fee923bc2209f406a1892772121c467f44533bedfe00a176139da5d310a
      002 45cc5e1b876550eee96f95bffb36c41b6cb7c07d33f671db5634405cd00fd7b8
      003 6a090cdbd334306fceacd0e4a1b9e0b0678efdbbdedbd1f5842035990c8abaff
      004 38827724bba908cf5721bd8d4e595d80f02c05c35f3dd7dbc4cd3c5678a42512
      005 ece0eb544368b3b4359fb8464caa9d89c7a6743c8ed070be1c7d599c3675d357
      006 d1e0566a257d149a0d99d450ce2885123f9995e9c01d0a5ef6df7044a72a468c
      007 2500a3fc21cb08133f06648a017cebfa27f30ea19c8cbe8dfefdf16227cfd490
      008 6b4bd92fd0099d1bab436b941875e99e0cb3c320997587182d6267af1844b1e8
      009 f95a817882eaeb0cb78bce82859a86bbb297a308ced730ebe449cd504211d3cd
    ].each_slice(2) do |p, checksum|
      patch :p0 do
        url "https://ftp.gnu.org/gnu/bash/bash-5.2-patches/bash52-#{p}"
        mirror "https://ftpmirror.gnu.org/bash/bash-5.2-patches/bash52-#{p}"
        mirror "https://mirrors.kernel.org/gnu/bash/bash-5.2-patches/bash52-#{p}"
        mirror "https://mirrors.ocf.berkeley.edu/gnu/bash/bash-5.2-patches/bash52-#{p}"
        sha256 checksum
      end
    end
  end

  # We're not using `url :stable` here because we need `url` to be a string
  # when we use it in the `strategy` block.
  livecheck do
    url "https://ftp.gnu.org/gnu/bash/?C=M&O=D"
    regex(/href=.*?bash[._-]v?(\d+(?:\.\d+)+)\.t/i)
    strategy :gnu do |page, regex|
      # Match versions from files
      versions = page.scan(regex)
                     .flatten
                     .uniq
                     .map { |v| Version.new(v) }
                     .sort
      next versions if versions.blank?

      # Assume the last-sorted version is newest
      newest_version = versions.last

      # Simply return the found versions if there isn't a patches directory
      # for the "newest" version
      patches_directory = page.match(%r{href=.*?(bash[._-]v?#{newest_version.major_minor}[._-]patches/?)["' >]}i)
      next versions if patches_directory.blank?

      # Fetch the page for the patches directory
      patches_page = Homebrew::Livecheck::Strategy.page_content(URI.join(@url, patches_directory[1]).to_s)
      next versions if patches_page[:content].blank?

      # Generate additional major.minor.patch versions from the patch files in
      # the directory and add those to the versions array
      patches_page[:content].scan(/href=.*?bash[._-]?v?\d+(?:\.\d+)*[._-]0*(\d+)["' >]/i).each do |match|
        versions << "#{newest_version.major_minor}.#{match[0]}"
      end

      versions
    end
  end

  bottle do
    sha256 arm64_ventura:  "8e71fa1eb06c6ab9bc3f8b71a32e83feb1e72e4e02e5fb57d60a8a6da0468f9a"
    sha256 arm64_monterey: "feb4dde0024d3423c10f33c7c87682e1b3a4a4b4316f4371b2e52f365c0045a1"
    sha256 arm64_big_sur:  "fadc8ed86018f69624c1e1b77f61a4d2186eec02181472fcd8c9dbb79a4ba0a6"
    sha256 monterey:       "c5ac1316a7f3db992d6ac4fc63c1c7a565141d688ae1ae5c81ec5f134edba02b"
    sha256 big_sur:        "f988f8092b7cd6a069d818d4632d70cb3805800747820b6ab84d0e7f75445ae7"
    sha256 catalina:       "7b1efacb1ac6516ae17c5182c8f461040ca0bfc2a8364c2b8593710a9ddb333f"
    sha256 x86_64_linux:   "4c433c846b57128117f6814e1ecc2a4bc7febc14bcb84935ce3f40ea51e80fb9"
  end

  def install
    # When built with SSH_SOURCE_BASHRC, bash will source ~/.bashrc when
    # it's non-interactively from sshd.  This allows the user to set
    # environment variables prior to running the command (e.g. PATH).  The
    # /bin/bash that ships with macOS defines this, and without it, some
    # things (e.g. git+ssh) will break if the user sets their default shell to
    # Homebrew's bash instead of /bin/bash.
    ENV.append_to_cflags "-DSSH_SOURCE_BASHRC"

    system "./configure", "--prefix=#{prefix}"
    system "make", "install"
  end

  test do
    assert_equal "hello", shell_output("#{bin}/bash -c \"echo -n hello\"")
  end
end
